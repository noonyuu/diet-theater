package main

import (
	"fmt"
	"net/http"
)

// "context"

// func contextWithProviderName(ctx *gin.Context, provider string) *http.Request {
// 	return ctx.Request.WithContext(context.WithValue(ctx.Request.Context(), "provider", provider))
// }
func main() {
	fmt.Println("Hello, World!")
	http.ListenAndServe(":10005", nil)
}
