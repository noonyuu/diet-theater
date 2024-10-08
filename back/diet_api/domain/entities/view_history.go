package entities

type ViewHistory struct {
	ID      uint
	UserID  string
	IssueID string
}

func NewViewHistory(id uint, userID string, issueID string) *ViewHistory {
	return &ViewHistory{
		ID:       id,
		UserID:  userID,
		IssueID: issueID,
	}
}

func (v *ViewHistory) GetID() uint {
	return v.ID
}

func (v *ViewHistory) GetUserID() string {
	return v.UserID
}

func (v *ViewHistory) GetIssueID() string {
	return v.IssueID
}

func (v *ViewHistory) SetViewHistoryID(id uint) {
	v.ID = id
}
