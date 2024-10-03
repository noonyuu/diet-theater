package speech_record

import (
	"context"
	"diet-theater/back/diet_api/domain/entities"
	"diet-theater/back/diet_api/domain/repositories"
	"diet-theater/back/diet_api/usecases/dto/input"
	"diet-theater/back/diet_api/usecases/dto/output"
)

type ICreateSpeechRecordInteractor interface {
	Execute(ctx context.Context, r []*input.CreateSpeechRecordInput) (*output.CreateSpeechRecordOutput, error)
}

type CreateSpeechRecordInteractor struct {
	speech_record_repository repositories.ISpeechRecordRepository
}

func NewSpeechRecordInteractor(
	speech_record_repository repositories.ISpeechRecordRepository,
) ICreateSpeechRecordInteractor {
	return &CreateSpeechRecordInteractor{
		speech_record_repository: speech_record_repository,
	}
}

// Execute implements ICreateSpeechRecordInteractor.
func (c *CreateSpeechRecordInteractor) Execute(ctx context.Context, r []*input.CreateSpeechRecordInput) (*output.CreateSpeechRecordOutput, error) {
	speechRecords := []*entities.SpeechRecord{}
	for _, v := range r {
		speechRecords = append(speechRecords, entities.NewSpeechRecord(
			v.Id,
			v.IssueId,
			v.SpeechId,
			v.Speaker,
			v.SpeakerYomi,
			v.SpeakerRole,
			v.SpeakerGroup,
			v.SpeakerPosition,
			v.SpeechOrigin,
			v.SpeechSummary,
			v.AnimationPoint,
		))
	}
	speechRecord, err := c.speech_record_repository.CreateSpeechRecord(ctx, speechRecords)
	if err != nil {
		return nil, err
	}

	output := &output.CreateSpeechRecordOutput{
		SpeechRecord: speechRecord,
	}

	return output, nil
}
