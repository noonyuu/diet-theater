package middleware

import (
	"github.com/gin-gonic/gin"

	"gin_oauth/auth"
)

func Middleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Set("autoed", false)
		c.Set("user", nil)
		c.Set("token", "")
		c.Set("isError", false)

		// トークンの取得
		token, err := c.Cookie("token")
		if err != nil {
			c.Set("isError", true)
			c.Next()
			return
		}
		// トークンの検証
		token_data, err := auth.ParseToken(token)
		if err != nil {
			c.Set("isError", true)
			c.Next()
			return
		}

		// ユーザー情報取得
		user_data, err := auth.GetUserInfo(token_data.BindId)
		if err != nil {
			c.Set("isError", true)
			c.Next()
			return
		}

		c.Set("user", user_data)
		c.Set("token", token)
		c.Set("autoed", true)

		c.Next()
	}
}
