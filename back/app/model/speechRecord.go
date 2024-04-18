package model

type SpeechRecord struct {
	ID              uint   `gorm:"primaryKey"`                        // 複合主キーの一部としてIDを定義
	IssueID         string `gorm:"primaryKey;type:char(21);not null"` // 複合主キーの一部としてIssueIDを定義
	SpeechID        string `gorm:"primaryKey;type:int;not null"`      // 複合主キーの一部としてSpeechIDを定義
	Speaker         string `gorm:"type:varchar(16);not null"`
	SpeekerYomi     string `gorm:"type:varchar(32)"`
	SpeakerRole     string `gorm:"type:varchar(32)"`
	SpeakerGroup    string `gorm:"type:varchar(32)"`
	SpeakerPosition string `gorm:"type:varchar(32)"`
	SpeechOrigin    string `gorm:"type:text;not null"`
	SpeechSummary   string `gorm:"type:text;not null"`
	SpeechNanoda    string `gorm:"type:text"`
}

// スピーチレコードの全件取得
func GetAllSpeechRecords(speechRecords *[]SpeechRecord) error {
	result := db.Find(speechRecords)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// スピーチレコードの会議単位取得
func GetSpeechRecordsOfMeeting(issueID string) error {
	result := db.Where("issue_id = ?", issueID).Find(&SpeechRecord{})
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// スピーチレコードの一件取得
func GetSpeechRecordOnce(issueID string, speechID string) (*SpeechRecord, error) {
	var speechRecord SpeechRecord
	result := db.Where("issue_id = ? AND speech_id = ?", issueID, speechID).First(&speechRecord)
	if result.Error != nil {
		return nil, result.Error
	}
	return &speechRecord, nil
}

// スピーチレコードの登録
func RegisterSpeechRecord(speechRecord *SpeechRecord) error {
	result := db.Create(speechRecord)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// スピーチレコードの更新
func UpdateSpeechRecord(speechRecord *SpeechRecord) error {
	result := db.Save(speechRecord)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// スピーチレコードの会議単位削除
func DeleteSpeechRecordsOfMeeting(issueID string) error {
	result := db.Where("issue_id = ?", issueID).Delete(&SpeechRecord{})
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// スピーチレコードの単体削除
func DeleteSpeechRecord(issueID string, speechID string) error {
	result := db.Where("issue_id = ? AND speech_id = ?", issueID, speechID).Delete(&SpeechRecord{})
	if result.Error != nil {
		return result.Error
	}
	return nil
}
