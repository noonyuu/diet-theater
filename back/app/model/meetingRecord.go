package model

import (
	"fmt"
	"log"
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

// 会議レコードの全件取得
func GetAllMeetingRecords(meetingRecords *[]MeetingRecord) error {
	result := db.Find(meetingRecords)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// 会議レコードの一件取得
func GetMeetingRecordByIssueID(issueID string) (*MeetingRecord, error) {
	var meetingRecord MeetingRecord
	result := db.Where("issue_id = ?", issueID).First(&meetingRecord)
	if result.Error != nil {
		return nil, result.Error
	}
	return &meetingRecord, nil
}

// 会議レコードの登録
func CreateMeetingRecord(meetingRecord *MeetingRecord) error {
	result := db.Create(meetingRecord)
	if result.Error != nil {
		log.Printf("会議記録の登録に失敗しました。エラー: %v", result.Error)
		return fmt.Errorf("会議記録の登録に失敗しました。エラー: %v", result.Error)
	}
	return nil
}

// 会議レコードの更新
func UpdateMeetingRecord(meetingRecord *MeetingRecord) error {
	result := db.Save(meetingRecord)
	if result.Error != nil {
		log.Printf("会議記録の更新に失敗しました。ID: %v, エラー: %v", meetingRecord.ID, result.Error)
		return fmt.Errorf("会議記録の更新に失敗しました。ID: %v, エラー: %v", meetingRecord.ID, result.Error)
	}
	return nil
}

// 会議レコードの削除
func DeleteMeetingRecord(meetingRecord *MeetingRecord) error {
	result := db.Delete(meetingRecord)
	if result.Error != nil {
		log.Printf("会議記録の削除に失敗しました。ID: %v, エラー: %v", meetingRecord.ID, result.Error)
		return fmt.Errorf("会議記録の削除に失敗しました。ID: %v, エラー: %v", meetingRecord.ID, result.Error)
	}
	return nil
}
