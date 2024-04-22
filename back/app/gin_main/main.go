package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	server := gin.Default()

	server.GET("/", func(c *gin.Context) {
		c.Redirect(http.StatusTemporaryRedirect, "/")
		// c.JSON(200, gin.H{
		// 	"message": "Hello, World!",
		// })
	})

	server.Run("0.0.0.0:8089")
}
