package auth

import (
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/google/uuid"
)

type SessionData struct {
	SessionId string
	ExpTime   int64
	UserAgent string
}

func JwtInit() error{
	// 古いトークンの削除
	go DeleteOldToken(time.Duration(time.Second * 1))
	return nil
}

func GetTime() time.Time {
	// 現在時刻を取得
	now_time := time.Now()
	// トークンの有効期限
	exp_time := now_time.AddDate(0, 1, 0)

	return exp_time
}

// トークン検証
func ParseToken(tokenString string) (Token, error) {
	return_data := Token{}
	// トークンの検証
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		// トークンの中身を取得
		_, err := ValidToken(claims["tokenId"].(string))
		if err != nil {
			return return_data, err
		}
		result := dbConn.Where(&Token{TokenId: claims["tokenId"].(string)}).First(&return_data)
		if result.Error != nil {
			return Token{}, result.Error
		}
		return return_data, nil
	}
	return return_data, err
}

func ValidToken(tokenId string) (string, error) {
	// db接続
	dbConn, err := GetDB()
	if err != nil {
		return "", err
	}

	get_data := &Token{}
	// トークン検証
	result := dbConn.Where(&Token{TokenId: tokenId}).First(&get_data)
	if result.Error != nil {
		return "", result.Error
	}
	return get_data.BindId, nil
}

// トークン登録
func InsertToken(bindId string, tokenId string, expTime time.Time, userAgent string) error {
	// db接続
	dbConn, err := GetDB()
	if err != nil {
		return err
	}
	// トークン登録
	result := dbConn.Create(&Token{TokenId: tokenId, BindId: bindId, ExpTime: expTime, UserAgent: userAgent})
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// トークン更新
func UpdateToken(tokenId string, userAgent string) (string, error) {
	// トークンからidを取得
	bindId, err := ValidToken(tokenId)
	if err != nil {
		return "", err
	}
	// 新しいトークンの生成
	new_token, err := GenToken(bindId, userAgent)
	if err != nil {
		return "", err
	}
	// トークンの無効化
	err = DeleteToken(tokenId)
	if err != nil {
		return "", err
	}
	return new_token, nil
}

// 古いトークンの削除
func DeleteOldToken(dur time.Duration) error {
	for {
		now_time := time.Now()
		// 有効期限が切れたトークンの削除
		result := dbConn.Where("exp_time < ?", now_time).Delete(&Token{})
		if result.Error != nil {
			return result.Error
		}
		time.Sleep(dur)
	}
}

// トークン削除
func DeleteToken(tokenId string) error {
	// db接続
	dbConn, err := GetDB()
	if err != nil {
		return err
	}
	// トークン削除
	result := dbConn.Where(&Token{TokenId: tokenId}).Delete(&Token{})
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// トークン生成
func GenToken(bindId string, userAgent string) (string, error) {
	// トークンIdの生成
	token_id := GenId()
	// トークンの有効期限
	exp_time := GetTime()
	// トークンの生成
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"tokenId": token_id,
		"exp":     exp_time.Unix(),
	})
	// トークンの署名
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return "", err
	}
	// トークンの登録
	err = InsertToken(bindId, token_id, exp_time, userAgent)
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

// トークンIdの生成
func GenId() string {
	// トークンIdの生成
	uuid := uuid.New()
	// トークンIdの文字列化とハイフンの削除
	token_id := strings.ReplaceAll(uuid.String(), "-", "")
	return token_id
}

// トークン無効化
func DisableToken(tokenString string) error {
	// トークンの検証
	token_data, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, jwt.ErrSignatureInvalid
		}

		return []byte(os.Getenv("JWT_SECRET")), nil
	})
	if err != nil {
		return err
	}
	if claims, ok := token_data.Claims.(jwt.MapClaims); ok && token_data.Valid {
		// トークンが有効か検証
		bindId, err := ValidToken(claims["tokenId"].(string))
		if err != nil {
			return err
		}
		_ = bindId
		// トークンの無効化
		err = DeleteToken(claims["tokenId"].(string))
		if err != nil {
			return err
		}
	}
	return err
}

// トークンの取得
func GetToken(bindId string) ([]SessionData, error) {
	// db接続
	dbConn, err := GetDB()
	if err != nil {
		return nil, err
	}
	// トークンの取得
	token := []Token{}
	result := dbConn.Where(&Token{BindId: bindId}).Find(&token)
	if result.Error != nil {
		return nil, result.Error
	}
	var session_data []SessionData
	for token_data := range token {
		session_data = append(session_data, SessionData{SessionId: token[token_data].TokenId, ExpTime: token[token_data].ExpTime.Unix(), UserAgent: token[token_data].UserAgent})
	}
	return session_data, nil
}
