package auth

import (
	"time"

	"gorm.io/driver/sqlite"
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
	initFlag = false
)

func InitDB() error {
	// DBを開く
	db_conn, err := gorm.Open(sqlite.Open("auth.db"), &gorm.Config{})
	if err != nil {
		return nil
	}

	// マイグレーション
	db_conn.AutoMigrate(&Token{})
	db_conn.AutoMigrate(&User{})

	// グローバル変数に保存
	dbConn = db_conn

	initFlag = true

	return nil
}

func GetDB() (*gorm.DB, error) {
	if !initFlag {
		err := InitDB()
		if err != nil {
			return nil, err
		}
	}
	return dbConn, nil
}
