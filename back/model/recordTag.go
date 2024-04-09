package model

type RecordTag struct {
	IssueID string `json:"issue_id" gorm:"primaryKey;type:char(4);not null"` // 複合主キーの一部としてIssueIDを定義
	TagID   string `json:"tag_id" gorm:"primaryKey;type:char(4);not null"`   // 複合主キーの一部としてTagを定義
}

// レコードタグの全権取得
func GetRecordTagAll(recordTags *[]RecordTag) error {
	result := db.Find(recordTags)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// レコードタグの一件取得
func GetRecordTagByIssueID(issueID string, tagID string) (*RecordTag, error) {
	var recordTag RecordTag
	result := db.Where("issue_id = ?", issueID).First(&recordTag)
	if result.Error != nil {
		return nil, result.Error
	}
	return &recordTag, nil
}

// レコードタグの登録
func RegisterRecordTag(recordTag *RecordTag) error {
	result := db.Create(recordTag)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// レコードタグの更新
func UpdateRecordTag(recordTag *RecordTag) error {
	result := db.Save(recordTag)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// レコードタグの会議単位削除
func DeketeRecordTagsOfMeeting(issueID string) error {
	result := db.Where("issue_id = ?", issueID).Delete(&RecordTag{})
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// レコードタグのタグ単位削除
func DeleteRecordTag(issueID string, tagID string) error {
	result := db.Where("issue_id = ? AND tag_id = ?", issueID, tagID).Delete(&RecordTag{})
	if result.Error != nil {
		return result.Error
	}
	return nil
}
