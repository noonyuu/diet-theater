package model

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var db *gorm.DB

func OpenDB() {
	var err error
	dsn := "root:root@tcp(db_diet:3306)/diet?charset=utf8mb4&parseTime=True&loc=Local"

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
	dsn := "root:root@tcp(db_diet:3306)/diet?charset=utf8mb4&parseTime=True&loc=Local"
	var err error
	db, err = gorm.Open(mysql.New(mysql.Config{
		DSN: dsn,
	}), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	return db, err
}

func GetDB() *gorm.DB {
	return db
}
