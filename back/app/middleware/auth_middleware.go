package middleware

import (
	"context"

	"github.com/gin-gonic/gin"
	"google.golang.org/grpc"

	"api/auth_grpc"
)

var isInit = false
var auth_conn auth_grpc.AuthServerClient = nil

func Init() error {
	// サーバーに接続
	conn, err := grpc.Dial("auth_server:10000")
	if err != nil {
		return err
	}

	// クライアントに接続
	auth_conn = auth_grpc.NewAuthServerClient(conn)

	// ミドルウェアの初期化
	isInit = true

	return nil
}

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// サーバーに接続
		if !isInit {
			err := Init()
			if err != nil {
				c.JSON(500, gin.H{"error": "Internal Server Error"})
				c.Abort()
				return
			}
		}
		// 初期化
		c.Set("success", false)
		c.Set("user", nil)

		// ヘッダーからトークンを取得
		token, err := c.Cookie("token")
		if err != nil {
			c.JSON(401, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		// トークンを検証
		res, err := auth_conn.Auth(context.Background(), &auth_grpc.AuthToken{Token: token,UserAgent: ""})
		if err != nil {
			c.JSON(500, gin.H{"error": "Internal Server Error"})
			c.Next()
			return
		}

		// 成功した場合
		if res.Success {
			c.Set("success", true)
			c.Set("user", res.User)
			c.Next()
			return
		}
		c.Next()
	}
}
