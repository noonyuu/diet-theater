package main

import (
	"log"

	"github.com/joho/godotenv"
)

func loadEnv() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Panicf("読み込み出来ませんでした: %v", err)
	}
}

func main() {
	loadEnv()
}
