package auth

import (
	"fmt"
	"time"
)

type User struct {
	UserId      string `gorm:"primaryKey"`
	Name        string
	NickName    string
	FirstName   string
	LastName    string
	AvatarURL   string
	Email       string
	Provider    string
	ProviderId  string
	Description string
	ExpiresAt   time.Time
}

// ユーザー情報登録
func CreateUser(user User) error {
	fmt.Println("CreateUser")
	// db接続
	dbConn, err := GetDB()
	if err != nil {
		return err
	}
	// ユーザー情報登録
	result := dbConn.Create(&user)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// ユーザー情報取得
func GetUserInfo(userId string) (User, error) {
	user := User{}
	result := dbConn.Where(&User{UserId: userId}).First(&user)
	if result.Error != nil {
		return User{}, result.Error
	}
	return user, nil
}

// ユーザー情報更新
func UpdateUser(user User) error {
	// db接続
	dbConn, err := GetDB()
	if err != nil {
		return err
	}
	// ユーザー情報更新
	result := dbConn.Save(&user)
	if result.Error != nil {
		return result.Error
	}
	return nil
}
