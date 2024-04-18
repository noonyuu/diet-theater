package handler

import (
	"api/model"
	"net/http"

	"github.com/labstack/echo/v4"
)

// レコードタグの登録
func CreateRecordTag(c echo.Context) error {
	recordTag := new(model.RecordTag)
	if err := c.Bind(recordTag); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	if err := model.RegisterRecordTag(recordTag); err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}
	return c.JSON(http.StatusCreated, recordTag)
}

// スピーチレコードの全権取得
func GetRecordTagList(c echo.Context) error {
	var recordTags []model.RecordTag
	if err := model.GetRecordTagAll(&recordTags); err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}
	return c.JSON(http.StatusOK, recordTags)
}
