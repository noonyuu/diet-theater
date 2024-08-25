package main

import (
	"context"
	"crypto/sha512"
	"fmt"
	"gin_oauth/auth"
	"gin_oauth/middleware"
	"log"
	"net/http"
	"os"
	"time"

	ratelimit "github.com/JGLTechnologies/gin-rate-limit"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
	"github.com/markbates/goth/providers/line"
	"github.com/mileusna/useragent"
	"github.com/wader/gormstore/v2"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// プロバイダー名をコンテキストに保存
func contextWithProviderName(ctx *gin.Context, provider string) *http.Request {
	return ctx.Request.WithContext(context.WithValue(ctx.Request.Context(), "provider", provider))
}

func keyFunc(c *gin.Context) string {
	return c.ClientIP()
}

// .envファイルを読み込む
func loadEnv() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Panic("Error loading .env file")
	}
}

// レートリミットのエラーハンドラ
func errorHandler(ctx *gin.Context, info ratelimit.Info) {
	ctx.String(429, "Too many requests. Try again in "+time.Until(info.ResetTime).String())
}

func main() {
	fmt.Println("Hello, World")

	loadEnv()

	// 初期化
	err := auth.InitDB()
	if err != nil {
		panic("failed to connect database")
	}

	// セッションの初期化
	key := os.Getenv("SESSION_SECRET")
	if key == "" {
		panic("SESSION_SECRET is not set")
	}

	// 認証用DBの初期化
	dbConn, err := gorm.Open(sqlite.Open("auth.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	//ストア設定
	// TODO: Redisにしたかった
	store := gormstore.New(dbConn, []byte(key))
	store.MaxAge(31536000)
	store.SessionOpts.Secure = true
	store.SessionOpts.HttpOnly = true
	store.SessionOpts.SameSite = http.SameSiteLaxMode

	//期限切れのセッションをクリーンアップ
	quit := make(chan struct{})
	go store.PeriodicCleanup(1*time.Hour, quit)

	// ストアをセット
	gothic.Store = store

	//プロバイダ設定
	goth.UseProviders(
		google.New(os.Getenv("GOOGLE_ID"), os.Getenv("GOOGLE_SECRET"), os.Getenv("GOOGLE_REDIRECT_URI"), "email", "profile"),
		line.New(os.Getenv("Line_ID"), os.Getenv("Line_SECRET"), os.Getenv("Line_Redirect_URL"), "profile", "openid"),
	)

	//grpcの初期化
	go StartGrpc()

	// サーバーの初期化
	server := gin.Default()

	rate_limit := ratelimit.InMemoryStore(&ratelimit.InMemoryOptions{
		Rate:  time.Second,
		Limit: 5,
	})

	mw := ratelimit.RateLimiter(rate_limit, &ratelimit.Options{
		ErrorHandler: errorHandler,
		KeyFunc:      keyFunc,
	})

	server.Use(mw)

	//セッション設定
	session_store := cookie.NewStore([]byte(key))
	session_store.Options(sessions.Options{
		MaxAge:   31536000,
		Secure:   true,
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
		Path:     "/",
		Domain:   "",
	})

	server.Use(sessions.Sessions("session", session_store))

	// ミドルウェア
	server.Use(middleware.Middleware())

	server.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "Hello, World!"})
	})
	server.POST("/refresh", func(c *gin.Context) {
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		// 認証判定
		autoed := c.MustGet("autoed").(bool)
		if !autoed {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}
		// トークンの取得
		token, err := auth.ParseToken(c.MustGet("token").(string))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		// ユーザーエージェントの取得
		user_agent := c.Request.Header.Get("User-Agent")
		// トークンの発行
		new_token, err := auth.UpdateToken(token.TokenId, user_agent)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		// CSRFトークンの取得
		c.SetSameSite(http.SameSiteLaxMode)
		// トークンの保存
		c.SetCookie("token", new_token, 31536000, "/", "", true, true)
		c.JSON(200, gin.H{"message": "success"})
	})

	server.GET("/:provider", func(c *gin.Context) {
		_, err := SetRedirectUrl(c)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		// 認証済みか判定
		autoed := c.MustGet("autoed").(bool)
		if autoed {
			err := Logout(c)
			if err != nil {
				c.JSON(500, gin.H{"error": err.Error()})
				return
			}
		}

		// プロバイダー名の取得
		provider := c.Param("provider")
		// プロバイダー名をコンテキストに保存
		c.Request = contextWithProviderName(c, provider)
		// 認証
		gothic.BeginAuthHandler(c.Writer, c.Request)
	})

	server.GET("/:provider/callback", func(c *gin.Context) {
		// プロバイダー名の取得
		provider := c.Param("provider")
		// プロバイダー名をコンテキストに保存
		c.Request = contextWithProviderName(c, provider)
		// 認証
		user, err := gothic.CompleteUserAuth(c.Writer, c.Request)
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		// IDの生成
		hash_data := sha512.Sum512([]byte(user.Provider + user.UserID))
		hash_data_str := fmt.Sprintf("%x", hash_data)

		// ユーザー情報の取得(存在しない場合はエラー)
		get_user, err := auth.GetUserInfo(hash_data_str)

		// ユーザー情報
		create_user := auth.User{
			UserId:      hash_data_str,
			Name:        user.Name,
			NickName:    user.NickName,
			FirstName:   user.FirstName,
			LastName:    user.LastName,
			AvatarURL:   user.AvatarURL,
			Email:       user.Email,
			Provider:    user.Provider,
			ProviderId:  user.UserID,
			Description: user.Description,
			ExpiresAt:   user.ExpiresAt,
		}
		if err == gorm.ErrRecordNotFound {
			// ユーザー情報の登録
			err := auth.CreateUser(create_user)
			if err != nil {
				c.JSON(500, gin.H{"error": err.Error()})
				return
			}
			// ユーザー情報の取得
			get_user, err = auth.GetUserInfo(hash_data_str)
			if err != nil {
				c.JSON(500, gin.H{"error": err.Error()})
				return
			}
		} else if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		} else {
			// ユーザー情報の更新
			err := auth.UpdateUser(create_user)
			if err != nil {
				c.JSON(500, gin.H{"error": err.Error()})
				return
			}
			// ユーザー情報の取得
			get_user, err = auth.GetUserInfo(hash_data_str)
			if err != nil {
				c.JSON(500, gin.H{"error": err.Error()})
				return
			}
		}
		_ = get_user

		// ユーザーエージェントの取得
		user_agent := c.GetHeader("User-Agent")

		// トークンの発行
		token, err := auth.GenToken(hash_data_str, user_agent)
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		// CSRFトークンの取得
		c.SetSameSite(http.SameSiteLaxMode)
		// トークンの保存
		c.SetCookie("token", token, 31536000, "/", "", true, true)
		// リダイレクトURLの取得
		c.Redirect(303, GetRedirectUrl(c))
	})

	// ログアウト
	server.POST("/logout", func(c *gin.Context) {
		// 認証済みか判定
		autoed := c.MustGet("autoed").(bool)
		if !autoed {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}
		// ログアウト
		err := Logout(c)
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		c.JSON(200, gin.H{"message": "success"})
	})

	// セッションの削除
	server.POST("/disable_session", func(c *gin.Context) {
		// 認証済みか判定
		autoed := c.MustGet("autoed").(bool)
		if !autoed {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}
		// ユーザー取得
		user := c.MustGet("user").(auth.User)

		var data DisableData

		// 情報の取得
		if err := c.ShouldBindJSON(&data); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		// トークンからidを取得
		user_id, err := auth.ValidToken(data.SessionID)
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}

		// ユーザーIDの比較
		if user.UserId != user_id {
			c.JSON(http.StatusAccepted, gin.H{"error": "invalid user"})
			return
		}

		// トークンの無効化
		err = auth.DeleteToken(data.SessionID)
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}

		c.JSON(200, gin.H{"message": "success"})
	})

	// ユーザー取得
	server.POST("/get-user", func(c *gin.Context) {
		// 認証済みか判定
		autoed := c.MustGet("autoed").(bool)
		if !autoed {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}
		// ユーザー取得
		user := c.MustGet("user").(auth.User)
		c.JSON(200, gin.H{
			"id":         user.UserId,
			"name":       user.Name,
			"nick_name":  user.NickName,
			"first_name": user.FirstName,
			"last_name":  user.LastName,
			"avatar_url": user.AvatarURL,
			"email":      user.Email,
			"provider":   user.Provider,
		})
	})

	server.POST("session", func(c *gin.Context) {
		//認証済みか判定
		autoed := c.MustGet("autoed").(bool)
		if !autoed {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}
		// ユーザー取得
		user := c.MustGet("user").(auth.User)
		// トークンの取得
		token, err := auth.GetToken(user.UserId)

		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}

		result := []SessionData{}

		for token_data := range token {
			// ユーザーエージェントの解析
			ua := useragent.Parse(token[token_data].UserAgent)

			result = append(result, SessionData{
				IsMobile:  ua.Mobile,
				IsDesktop: ua.Desktop,
				IsTablet:  ua.Tablet,
				IsBot:     ua.Bot,
				OSstr:     ua.OS,
				Browser:   ua.Name,
				ExpTime:   token[token_data].ExpTime,
				SessionID: token[token_data].SessionId,
			})
		}
		c.JSON(200, gin.H{"data": result})
	})

	err = server.RunTLS(":3000", "./keys/server.crt", "./keys/server.key")
	if err != nil {
		panic(err)
	}
}

type DisableData struct {
	SessionID string
}

type SessionData struct {
	IsMobile  bool
	IsDesktop bool
	IsTablet  bool
	IsBot     bool

	OSstr     string
	Browser   string
	ExpTime   int64
	SessionID string
}

// リダイレクトURLの設定
func SetRedirectUrl(c *gin.Context) (string, error) {
	// セッションの取得
	session := sessions.Default(c)
	redirect_url := c.DefaultQuery("redirect_path", "")
	// リダイレクトURLの保存
	session.Set("redirect_path", redirect_url)

	err := session.Save()
	if err != nil {
		return "", err
	}
	return redirect_url, nil
}

// リダイレクトURLの取得
func GetRedirectUrl(c *gin.Context) string {
	// セッションの取得
	session := sessions.Default(c)
	redirect_url := session.Get("redirect_path")

	if redirect_url == nil {
		return ""
	}

	return redirect_url.(string)
}

// ログアウト
func Logout(c *gin.Context) error {
	gothic.Logout(c.Writer, c.Request)
	// トークンの無効化
	err := auth.DeleteToken(c.MustGet("token").(string))
	if err != nil {
		return err
	}
	//cookie削除
	c.SetCookie("token", "", -1, "/", "", true, true)

	return nil
}
