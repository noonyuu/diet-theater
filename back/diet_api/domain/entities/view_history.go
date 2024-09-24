package entities

type ViewHistory struct {
	id       uint
	user_id  string
	issue_id string
}

func NewViewHistory(id uint, user_id string, issue_id string) *ViewHistory {
	return &ViewHistory{
		id:       id,
		user_id:  user_id,
		issue_id: issue_id,
	}
}

func (v *ViewHistory) GetID() uint {
	return v.id
}

func (v *ViewHistory) GetUserID() string {
	return v.user_id
}

func (v *ViewHistory) GetIssueID() string {
	return v.issue_id
}

func (v *ViewHistory) SetViewHistoryID(id uint) {
	v.id = id
}
