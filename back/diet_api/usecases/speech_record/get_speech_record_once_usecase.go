package speech_record

import (
	"context"
	"diet-theater/back/diet_api/domain/repositories"
	"diet-theater/back/diet_api/usecases/dto/output"
)

type IGetSpeechRecordOnceInteractor interface {
	Execute(ctx context.Context, issueID string) (*output.GetSpeechRecordOnceOutput, error)
}

type GetSpeechRecordOnceInteractor struct {
	speech_record_repository repositories.ISpeechRecordRepository
}

func NewGetSpeechRecordOnceInteractor(
	speech_record_repository repositories.ISpeechRecordRepository,
) IGetSpeechRecordOnceInteractor {
	return &GetSpeechRecordOnceInteractor{
		speech_record_repository: speech_record_repository,
	}
}
func (g *GetSpeechRecordOnceInteractor) Execute(ctx context.Context, issueID string) (*output.GetSpeechRecordOnceOutput, error) {
	speechRecord, err := g.speech_record_repository.GetSpeechRecordOnce(ctx, issueID)
	if err != nil {
		return nil, err
	}

	output := &output.GetSpeechRecordOnceOutput{
		SpeechRecord: speechRecord,
	}

	return output, nil
}
