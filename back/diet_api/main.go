package main

import (
	"diet-theater/back/diet_api/infrastructure"
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
	infrastructure.InitRouter()
}
