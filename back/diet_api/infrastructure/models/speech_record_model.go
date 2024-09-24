package models

import "diet-theater/back/diet_api/domain/entities"

type SpeechRecord struct {
	ID              uint   `json:"id"`
	IssueID         string `json:"issue_id"`
	SpeechID        string `json:"speech_id"`
	Speaker         string `json:"speaker"`
	SpeakerYomi     string `json:"speaker_yomi"`
	SpeakerRole     string `json:"speaker_role"`
	SpeakerGroup    string `json:"speaker_group"`
	SpeakerPosition string `json:"speaker_position"`
	SpeechOrigin    string `json:"speech_origin"`
	SpeechSummary   string `json:"speech_summary"`
	AnimationPoint  string `json:"animation_point"`
}

func FromSpeechDomainModel(s *entities.SpeechRecord) *SpeechRecord {
	return &SpeechRecord{
		ID:              s.GetID(),
		IssueID:         s.GetIssueID(),
		SpeechID:        s.GetSpeechID(),
		Speaker:         s.GetSpeaker(),
		SpeakerYomi:     s.GetSpeakerYomi(),
		SpeakerRole:     s.GetSpeakerRole(),
		SpeakerGroup:    s.GetSpeakerGroup(),
		SpeakerPosition: s.GetSpeakerPosition(),
		SpeechOrigin:    s.GetSpeechOrigin(),
		SpeechSummary:   s.GetSpeechSummary(),
		AnimationPoint:  s.GetAnimationPoint(),
	}
}

func (s *SpeechRecord) ToDomainSpeechModel() *entities.SpeechRecord {
	return entities.NewSpeechRecord(s.ID, s.IssueID, s.SpeechID, s.Speaker, s.SpeakerYomi, s.SpeakerRole, s.SpeakerGroup, s.SpeakerPosition, s.SpeechOrigin, s.SpeechSummary, s.AnimationPoint)
}
