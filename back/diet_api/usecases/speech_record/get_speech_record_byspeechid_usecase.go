package speech_record

import (
	"context"
	"diet-theater/back/diet_api/domain/repositories"
	"diet-theater/back/diet_api/usecases/dto/output"
)

type IGetSpeechRecordBySpeechIdInteractor interface {
	Execute(ctx context.Context, issueID string, speechID string) (*output.GetSpeechRecordOnceBySpeechIDOutput, error)
}

type getSpeechRecordOnceBySpeechIdInteractor struct {
	speech_record_repository repositories.ISpeechRecordRepository
}

func NewGetSpeechRecordBySpeechIdInteractor(
	speech_record_repository repositories.ISpeechRecordRepository,
) IGetSpeechRecordBySpeechIdInteractor {
	return &getSpeechRecordOnceBySpeechIdInteractor{
		speech_record_repository: speech_record_repository,
	}
}

// Execute implements IGetSpeechRecordBySpeechIdInteractor.
func (g *getSpeechRecordOnceBySpeechIdInteractor) Execute(ctx context.Context, issueID string, speechID string) (*output.GetSpeechRecordOnceBySpeechIDOutput, error) {
	speechRecord, err := g.speech_record_repository.GetSpeechRecordOnceBySpeechID(ctx, issueID, speechID)
	if err != nil {
		return nil, err
	}

	output := &output.GetSpeechRecordOnceBySpeechIDOutput{
		SpeechRecord: speechRecord,
	}

	return output, nil
}
