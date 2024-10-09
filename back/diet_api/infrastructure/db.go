package infrastructure

import (
	"fmt"
	"os"

	"diet-theater/back/diet_api/infrastructure/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func NewDB() (*gorm.DB, error) {
	uname := os.Getenv("DB_USER")
	dbName := os.Getenv("DB_NAME")
	password := os.Getenv("DB_PASS")
	host := os.Getenv("DB_ROOT_HOST")
	port := os.Getenv("DB_PORT")

	// 環境変数が設定されているか確認
	if uname == "" || dbName == "" || password == "" || host == "" || port == "" {
		return nil, fmt.Errorf("one or more environment variables are not set")
	}

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", uname, password, host, port, dbName)

	var rules = &gorm.Config{
		SkipDefaultTransaction: true, // トランザクションをスキップする
		PrepareStmt:            true, // ステートメントを事前に準備する
	}

	// データベースに接続
	db, err := gorm.Open(mysql.Open(dsn), rules)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	// MeetingRecordとSpeechRecordのスキーマをマイグレート
	if err := db.AutoMigrate(&models.MeetingRecord{}, &models.SpeechRecord{}, &models.ViewHistory{}); err != nil {
		return nil, fmt.Errorf("failed to migrate schema: %w", err)
	}

	return db, nil
}
