package repositories

import (
	"context"
	"diet-theater/back/diet_api/domain/entities"
)

type ISpeechRecordRepository interface {
	GetSpeechRecordOnce(ctx context.Context, issueId string) (*entities.SpeechRecord, error)
	GetSpeechRecordOnceBySpeechID(ctx context.Context, issueId string, speechId string) (*entities.SpeechRecord, error)
	GetSpeechRecordAll(ctx context.Context) ([]*entities.SpeechRecord, error)
	CreateSpeechRecord(ctx context.Context, speechRecord []*entities.SpeechRecord) ([]*entities.SpeechRecord, error)
}
