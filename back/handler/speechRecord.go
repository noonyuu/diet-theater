package handler

import (
	"api/model"
	"net/http"

	"github.com/labstack/echo/v4"
)

// スピーチレコードの登録
func CreateSpeechRecord(c echo.Context) error {
	speechRecord := new(model.SpeechRecord)
	if err := c.Bind(speechRecord); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	if err := model.RegisterSpeechRecord(speechRecord); err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}
	return c.JSON(http.StatusCreated, speechRecord)
}

// 会議レコードの全件取得
func GetSpeechRecordAll(c echo.Context) error {
	var speechRecords []model.SpeechRecord
	if err := model.GetAllSpeechRecords(&speechRecords); err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}
	return c.JSON(http.StatusOK, speechRecords)
}

// 会議レコードの一件取得
func GetSpeechRecordOnce(c echo.Context) error {
	issueID := c.Param("issueID")
	speechID := c.Param("speechID")
	speechRecord, err := model.GetSpeechRecordOnce(issueID, speechID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}
	return c.JSON(http.StatusOK, speechRecord)
}

// スピーチレコードの会議単位取得
func GetSpeechRecordsOfMeeting(c echo.Context) error {
	issueID := c.Param("issueID")
	if err := model.GetSpeechRecordsOfMeeting(issueID); err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}
	return c.JSON(http.StatusOK, issueID)
}
