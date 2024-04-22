package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("Hello world!")

	http.ListenAndServe(":10005", nil)
}
