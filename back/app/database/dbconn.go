package database

import (
	"errors"
	"fmt"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	dbConn *gorm.DB
	isInit bool = false
)

func Init() error {

	var db *gorm.DB
	var err error

	uname := os.Getenv("DB_USER")
	dbname := os.Getenv("DB_NAME")
	password := os.Getenv("DB_PASS")
	host := os.Getenv("DB_ROOT_HOST")
	port := os.Getenv("DB_PORT")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", uname, password, host, port, dbname)
	// GORMでデータベースに接続
	fmt.Println(dsn)
	dbConn, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return err
	}

	db = dbConn

	// MeetingRecordとSpeechRecordのスキーマをマイグレート
	if err := db.AutoMigrate(&MeetingRecord{}, &SpeechRecord{}); err != nil {
		return err
	}
	//初期化済みにする
	isInit = true

	return nil
}

func GetDB() (*gorm.DB, error) {
	//初期化されていなかったら
	if !isInit {
		//初期化されていないエラーを返す
		return nil, errors.New("database is not initialized")
	}
	return dbConn, nil
}
