package database

import (
	"errors"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	db *gorm.DB
	isInit bool = false
)

func loadEnv() {
	fmt.Println("DB Password:", os.Getenv("DB_PASS")) 
	err := godotenv.Load(".env")
	if err != nil {
		log.Panic("Error loading .env file")
	}
}

func OpenDB() {
	log.Println("OpenDB")
	loadEnv()
	var err error
	dsn := "diet:" + os.Getenv("DB_PASS")+"@tcp(db_diet:3306)/diet?charset=utf8mb4&parseTime=True&loc=Local"

	db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
}

func Migrate() {
	db.AutoMigrate(&SpeechRecord{}, &MeetingRecord{}, &Tag{}, &RecordTag{})
}

func DeleteDB() {
	// テーブルを削除
	db.Migrator().DropTable(&SpeechRecord{}, &MeetingRecord{}, &Tag{}, &RecordTag{})
}

func NewDBConnection() (*gorm.DB, error) {
	dsn := "diet:diet@tcp(db_diet:3306)/diet?charset=utf8mb4&parseTime=True&loc=Local"
	var err error
	db, err = gorm.Open(mysql.New(mysql.Config{
		DSN: dsn,
	}), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	return db, err
}

func GetDB() (*gorm.DB, error) {
	//初期化されていなかったら
	if !isInit {
		//初期化されていないエラーを返す
		return nil, errors.New("database is not initialized")
	}
	return db, nil
}
