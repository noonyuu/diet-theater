package entities

type ViewHistory struct {
	id       uint
	user_id  uint
	issue_id uint
}

func NewViewHistory(id uint, user_id uint, issue_id uint) *ViewHistory {
	return &ViewHistory{
		id:       id,
		user_id:  user_id,
		issue_id: issue_id,
	}
}
 
func (v *ViewHistory) GetID() uint {
	return v.id
}

func (v *ViewHistory) SetViewHistoryID(id uint) {
	v.id = id
}
