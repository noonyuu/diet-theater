package auth

import (
	"fmt"
	"os"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Token struct {
	TokenId   string `gorm:"primaryKey"`
	BindId    string
	ExpTime   time.Time
	UserAgent string
}

var (
	// DB接続
	dbConn *gorm.DB
	// 初期化確認
	isInit = false
)

func InitDB() error {
	fmt.Println("InitDB")
	var db *gorm.DB
	var err error

	uname := os.Getenv("DB_USER")
	dbname := os.Getenv("DB_NAME")
	password := os.Getenv("DB_PASS")
	host := os.Getenv("DB_ROOT_HOST")
	port := os.Getenv("DB_PORT")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", uname, password, host, port, dbname)
	fmt.Println(dsn)
	// DBを開く
	dbConn, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return err
	}

	db = dbConn

	// マイグレーション
	if err := db.AutoMigrate(&Token{}, &User{}); err != nil {
		return err
	}

	isInit = true

	return nil
}

func GetDB() (*gorm.DB, error) {
	if !isInit {
		err := InitDB()
		if err != nil {
			return nil, err
		}
	}
	return dbConn, nil
}
