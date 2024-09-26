package entities

type MeetingRecord struct {
	ID            uint
	IssueID       string
	Session       int
	NameOfHouse   string
	NameOfMeeting string
	Issue         string
	Date          string
}

func NewMeetingRecord(id uint, issueID string, session int, nameOfHouse string, nameOfMeeting string, issue string, date string) *MeetingRecord {
	return &MeetingRecord{
		ID:            id,
		IssueID:       issueID,
		Session:       session,
		NameOfHouse:   nameOfHouse,
		NameOfMeeting: nameOfMeeting,
		Issue:         issue,
		Date:          date,
	}
}

func (m *MeetingRecord) GetID() uint {
	return m.ID
}

func (m *MeetingRecord) GetIssueID() string {
	return m.IssueID
}

func (m *MeetingRecord) GetSession() int {
	return m.Session
}

func (m *MeetingRecord) GetNameOfHouse() string {
	return m.NameOfHouse
}

func (m *MeetingRecord) GetNameOfMeeting() string {
	return m.NameOfMeeting
}

func (m *MeetingRecord) GetIssue() string {
	return m.Issue
}

func (m *MeetingRecord) GetDate() string {
	return m.Date
}

func (m *MeetingRecord) SetMeetingRecordID(id uint) {
	m.ID = id
}
