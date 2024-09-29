package usecases

import (
	"context"
	"diet-theater/back/diet_api/domain/repositories"
	"diet-theater/back/diet_api/usecases/dto/output"
)

type IGetMeetingRecordAllInteractor interface {
	Execute(ctx context.Context) (*output.GetMeetingRecordAllOutput, error)
}

type GetMeetingRecordAllInteractor struct {
	meeting_record_repository repositories.IMeetingRecordRepository
}

func NewGetMeetingRecordAllInteractor(
	meeting_record_repository repositories.IMeetingRecordRepository,
) IGetMeetingRecordAllInteractor {
	return &GetMeetingRecordAllInteractor{
		meeting_record_repository: meeting_record_repository,
	}
}

// Execute implements IGetMeetingRecordAllInteractor.
func (g *GetMeetingRecordAllInteractor) Execute(ctx context.Context) (*output.GetMeetingRecordAllOutput, error) {
	meetingRecord, err := g.meeting_record_repository.GetMeetingRecordAll(ctx)
	if err != nil {
		return nil, err
	}

		output := &output.GetMeetingRecordAllOutput{
		MeetingRecord: meetingRecord,
	}

	return output, nil
}
