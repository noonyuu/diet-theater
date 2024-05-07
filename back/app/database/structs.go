package database

import (
	"time"

	"gorm.io/gorm"
)

type MeetingRecord struct {
	ID            uint           `gorm:"primaryKey"`                        // 複合主キーの一部としてIDを定義
	IssueID       string         `gorm:"primaryKey;type:char(21);not null"` // 複合主キーの一部としてIssueIDを定義
	Session       int            `gorm:"not null"`
	NameOfHouse   string         `gorm:"type:varchar(5);not null"`
	NameOfMeeting string         `gorm:"type:text"`
	Issue         string         `gorm:"type:varchar(5)"`
	Date          string         `gorm:"type:date"`
	CreatedAt     time.Time      // gorm.Modelから分離
	UpdatedAt     time.Time      // gorm.Modelから分離
	DeletedAt     gorm.DeletedAt `gorm:"index"` // 論理削除をサポート
}

type RecordTag struct {
	IssueID string `json:"issue_id" gorm:"primaryKey;type:char(4);not null"` // 複合主キーの一部としてIssueIDを定義
	TagID   string `json:"tag_id" gorm:"primaryKey;type:char(4);not null"`   // 複合主キーの一部としてTagを定義
}

type Tag struct {
	TagID   string `gorm:"primaryKey;type:char(4);not null"`
	TagName string `gorm:"type:varchar(32);not null"`
}

type SpeechRecord struct {
	ID            uint   `gorm:"primaryKey"`                        // 複合主キーの一部としてIDを定義
	IssueID       string `gorm:"primaryKey;type:char(21);not null"` // 複合主キーの一部としてIssueIDを定義
	SpeechID      string `gorm:"primaryKey;type:int;not null"`      // 複合主キーの一部としてSpeechIDを定義
	Speaker       string `gorm:"type:varchar(16);not null"`
	SpeakerYomi   string `gorm:"type:varchar(32)"`
	SpeakerGroup  string `gorm:"type:varchar(32)"`
	SpeechOrigin  string `gorm:"type:text;not null"`
	SpeechSummary string `gorm:"type:text;not null"`
}
