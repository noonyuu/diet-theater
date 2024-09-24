package repositories

import (
	"api/domain/entities"
	"context"
)

type ISpeechRecordRepository interface {
	GetSpeechRecordOnce(ctx context.Context, issue_id uint) (*entities.SpeechRecord, error)
	GetSpeechRecordOnceBySpeechID(ctx context.Context, issue_id uint, speech_id uint) (*entities.SpeechRecord, error)
	GetSpeechRecordAll(ctx context.Context) ([]*entities.SpeechRecord, error)
	CreateSpeechRecord(ctx context.Context, speechRecord *entities.SpeechRecord) (uint, error)
}
