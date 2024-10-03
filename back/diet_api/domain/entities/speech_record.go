package entities

type SpeechRecord struct {
	ID              uint
	IssueID         string
	SpeechID        string
	Speaker         string
	SpeakerYomi     string
	SpeakerRole     string
	SpeakerGroup    string
	SpeakerPosition string
	SpeechOrigin    string
	SpeechSummary   string
	AnimationPoint  string
}

func NewSpeechRecord(id uint, issueID string, speechID string, speaker string, speakerYomi string, speakerRole string, speakerGroup string, speakerPosition string, speechOrigin string, speechSummary string, animationPoint string) *SpeechRecord {
	return &SpeechRecord{
		ID:              id,
		IssueID:         issueID,
		SpeechID:        speechID,
		Speaker:         speaker,
		SpeakerYomi:     speakerYomi,
		SpeakerRole:     speakerRole,
		SpeakerGroup:    speakerGroup,
		SpeakerPosition: speakerPosition,
		SpeechOrigin:    speechOrigin,
		SpeechSummary:   speechSummary,
		AnimationPoint:  animationPoint,
	}
}

func (s *SpeechRecord) GetID() uint {
	return s.ID
}

func (s *SpeechRecord) GetIssueID() string {
	return s.IssueID
}

func (s *SpeechRecord) GetSpeechID() string {
	return s.SpeechID
}

func (s *SpeechRecord) GetSpeaker() string {
	return s.Speaker
}

func (s *SpeechRecord) GetSpeakerYomi() string {
	return s.SpeakerYomi
}

func (s *SpeechRecord) GetSpeakerRole() string {
	return s.SpeakerRole
}

func (s *SpeechRecord) GetSpeakerGroup() string {
	return s.SpeakerGroup
}

func (s *SpeechRecord) GetSpeakerPosition() string {
	return s.SpeakerPosition
}

func (s *SpeechRecord) GetSpeechOrigin() string {
	return s.SpeechOrigin
}

func (s *SpeechRecord) GetSpeechSummary() string {
	return s.SpeechSummary
}

func (s *SpeechRecord) GetAnimationPoint() string {
	return s.AnimationPoint
}

func (s *SpeechRecord) SetSpeechRecordID(id uint) {
	s.ID = id
}
