package database

import (
	"time"

	"gorm.io/gorm"
)

type MeetingRecord struct {
	ID            uint           `gorm:"primaryKey"`                        // 複合主キーの一部としてIDを定義
	IssueID       string         `gorm:"primaryKey;type:char(21);not null"` // 複合主キーの一部としてIssueIDを定義
	Session       int            `gorm:"not null"`                          // 国会回次
	NameOfHouse   string         `gorm:"type:varchar(5);not null"`          // 院名
	NameOfMeeting string         `gorm:"type:text"`                         // 会議名
	Issue         string         `gorm:"type:varchar(5)"`                   // 号数
	Date          string         `gorm:"type:varchar(10)"`                  // 開催日
	CreatedAt     time.Time      // gorm.Modelから分離
	UpdatedAt     time.Time      // gorm.Modelから分離
	DeletedAt     gorm.DeletedAt `gorm:"index"` // 論理削除をサポート
}

type SpeechRecord struct {
	ID              uint   `gorm:"primaryKey"`                           // 複合主キーの一部としてIDを定義
	IssueID         string `gorm:"primaryKey;type:char(21);not null"`    // 複合主キーの一部としてIssueIDを定義
	SpeechID        string `gorm:"primaryKey;type:varchar(26);not null"` // 複合主キーの一部としてSpeechIDを定義
	Speaker         string `gorm:"type:varchar(16);not null"`            // 発言者
	SpeakerYomi     string `gorm:"type:varchar(32)"`                     // 読み仮名
	SpeakerRole     string `gorm:"type:varchar(32)"`                     // 役割
	SpeakerGroup    string `gorm:"type:varchar(32)"`                     // 会派
	SpeakerPosition string `gorm:"type:varchar(255)"`                    // 肩書き
	SpeechOrigin    string `gorm:"type:text;not null"`                   // 原文
	SpeechSummary   string `gorm:"type:text;not null"`                   // 要約
	AnimationPoint  string `gorm:"type:varchar(5)"`                      // アニメーションポイント
}
