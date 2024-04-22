package model

type Tag struct {
	TagID   string `gorm:"primaryKey;type:char(4);not null"`
	TagName string `gorm:"type:varchar(32);not null"`
}

// タグの全件取得
func GetAllTags(tags *[]Tag) error {
	result := db.Find(tags)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// タグの登録
func RegisterTag(tag *Tag) error {
	result := db.Create(tag)
	if result.Error != nil {
		return result.Error
	}
	return nil
}
