package handler

import (
	"api/model"
	"net/http"

	"github.com/labstack/echo/v4"
)

// 会議レコードの全件取得
func GetMeetingRecordAll(c echo.Context) error {
	var meetingRecords []model.MeetingRecord
	if err := model.GetAllMeetingRecords(&meetingRecords); err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}
	return c.JSON(http.StatusOK, meetingRecords)
}

// 会議レコードの一件取得
func GetMeetingRecordByIssueID(c echo.Context) error {
	issueID := c.Param("issueID")
	meetingRecord, err := model.GetMeetingRecordByIssueID(issueID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}
	return c.JSON(http.StatusOK, meetingRecord)
}

// 会議レコードの登録
func CreateMeetingRecord(c echo.Context) error {
	meetingRecord := new(model.MeetingRecord)
	if err := c.Bind(meetingRecord); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	if err := model.CreateMeetingRecord(meetingRecord); err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}
	return c.JSON(http.StatusCreated, meetingRecord)
}

// TODO: 未実装

// 会議レコードの更新

// 会議レコードの削除
