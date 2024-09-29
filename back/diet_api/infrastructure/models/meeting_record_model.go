package models

import (
	"diet-theater/back/diet_api/domain/entities"

	"gorm.io/gorm"
)

type MeetingRecord struct {
	gorm.Model
	ID            uint   `json:"id"`
	IssueID       string `json:"issue_id"`
	Session       int    `json:"session"`
	NameOfHouse   string `json:"name_of_house"`
	NameOfMeeting string `json:"name_of_meeting"`
	Issue         string `json:"issue"`
	Date          string `json:"date"`
}

func FromMeetingDomainModel(m *entities.MeetingRecord) *MeetingRecord {
	return &MeetingRecord{
		ID:            m.GetID(),
		IssueID:       m.GetIssueID(),
		Session:       m.GetSession(),
		NameOfHouse:   m.GetNameOfHouse(),
		NameOfMeeting: m.GetNameOfMeeting(),
		Issue:         m.GetIssue(),
		Date:          m.GetDate(),
	}
}

func (m *MeetingRecord) ToDomainMeetingModel() *entities.MeetingRecord {
	return entities.NewMeetingRecord(m.ID, m.IssueID, m.Session, m.NameOfHouse, m.NameOfMeeting, m.Issue, m.Date)
}
