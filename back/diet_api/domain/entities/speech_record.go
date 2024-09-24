package entities

type SpeechRecord struct {
	id               uint
	issue_id         string
	speech_id        string
	speaker          string
	speaker_yomi     string
	speaker_role     string
	speaker_group    string
	speaker_position string
	speech_origin    string
	speech_summary   string
	animation_point  string
}

func NewSpeechRecord(id uint, issue_id string, speech_id string, speaker string, speaker_yomi string, speaker_role string, speaker_group string, speaker_position string, speech_origin string, speech_summary string, animation_point string) *SpeechRecord {
	return &SpeechRecord{
		id:               id,
		issue_id:         issue_id,
		speech_id:        speech_id,
		speaker:          speaker,
		speaker_yomi:     speaker_yomi,
		speaker_role:     speaker_role,
		speaker_group:    speaker_group,
		speaker_position: speaker_position,
		speech_origin:    speech_origin,
		speech_summary:   speech_summary,
		animation_point:  animation_point,
	}
}

func (s *SpeechRecord) GetID() uint {
	return s.id
}

func (s *SpeechRecord) GetIssueID() string {
	return s.issue_id
}

func (s *SpeechRecord) GetSpeechID() string {
	return s.speech_id
}

func (s *SpeechRecord) GetSpeaker() string {
	return s.speaker
}

func (s *SpeechRecord) GetSpeakerYomi() string {
	return s.speaker_yomi
}

func (s *SpeechRecord) GetSpeakerRole() string {
	return s.speaker_role
}

func (s *SpeechRecord) GetSpeakerGroup() string {
	return s.speaker_group
}

func (s *SpeechRecord) GetSpeakerPosition() string {
	return s.speaker_position
}

func (s *SpeechRecord) GetSpeechOrigin() string {
	return s.speech_origin
}

func (s *SpeechRecord) GetSpeechSummary() string {
	return s.speech_summary
}

func (s *SpeechRecord) GetAnimationPoint() string {
	return s.animation_point
}

func (s *SpeechRecord) SetSpeechRecordID(id uint) {
	s.id = id
}
