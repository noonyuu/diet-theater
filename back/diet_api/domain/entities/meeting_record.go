package entities

type MeetingRecord struct {
	id              uint
	issue_id        string
	session         int
	name_of_house   string
	name_of_meeting string
	issue           string
	date            string
}

func NewMeetingRecord(id uint, issue_id string, session int, name_of_house string, name_of_meeting string, issue string, date string) *MeetingRecord {
	return &MeetingRecord{
		id:              id,
		issue_id:        issue_id,
		session:         session,
		name_of_house:   name_of_house,
		name_of_meeting: name_of_meeting,
		issue:           issue,
		date:            date,
	}
}

func (m *MeetingRecord) GetID() uint {
	return m.id
}

func (m *MeetingRecord) SetMeetingRecordID(id uint) {
	m.id = id
}
