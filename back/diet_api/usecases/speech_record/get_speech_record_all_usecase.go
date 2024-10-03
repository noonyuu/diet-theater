package speech_record

import (
	"context"
	"diet-theater/back/diet_api/domain/repositories"
	"diet-theater/back/diet_api/usecases/dto/output"
)

type IGetSpeechRecordAllInteractor interface {
	Execute(ctx context.Context) (*output.GetSpeechRecordAllOutput, error)
}

type getSpeechRecordAllInteractor struct {
	speech_record_repository repositories.ISpeechRecordRepository
}

func NewGetSpeechRecordAllInteractor(
	speech_record_repository repositories.ISpeechRecordRepository,
) IGetSpeechRecordAllInteractor {
	return &getSpeechRecordAllInteractor{
		speech_record_repository: speech_record_repository,
	}
}

// Execute implements IGetSpeechRecordAllInteractor.
func (g *getSpeechRecordAllInteractor) Execute(ctx context.Context) (*output.GetSpeechRecordAllOutput, error) {
	speechRecord, err := g.speech_record_repository.GetSpeechRecordAll(ctx)
	if err != nil {
		return nil, err
	}

	output := &output.GetSpeechRecordAllOutput{
		SpeechRecord: speechRecord,
	}

	return output, nil
}
