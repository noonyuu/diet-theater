package models

import (
	"diet-theater/back/diet_api/domain/entities"

	"gorm.io/gorm"
)

type ViewHistory struct {
	gorm.Model
	ID      uint   `json:"id"`
	UserID  string `json:"user_id"`
	IssueID string `json:"issue_id"`
}

func FromViewHistoryDomainModel(v *entities.ViewHistory) *ViewHistory {
	return &ViewHistory{
		ID:      v.GetID(),
		UserID:  v.GetUserID(),
		IssueID: v.GetIssueID(),
	}
}

func (v *ViewHistory) ToDomainViewHistoryModel() *entities.ViewHistory {
	return entities.NewViewHistory(v.ID, v.UserID, v.IssueID)
}
