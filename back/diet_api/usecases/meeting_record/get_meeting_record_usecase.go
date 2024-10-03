package meeting_record

import (
	"context"
	"diet-theater/back/diet_api/domain/repositories"
	"diet-theater/back/diet_api/usecases/dto/output"
)

type IGetMeetingRecordInteractor interface {
	Execute(ctx context.Context, issueId string) (*output.GetMeetingRecordOutput, error)
}

type GetMeetingRecordInteractor struct {
	meeting_record_repository repositories.IMeetingRecordRepository
}

func NewGetMeetingRecordInteractor(
	meeting_record_repository repositories.IMeetingRecordRepository,
) IGetMeetingRecordInteractor {
	return &GetMeetingRecordInteractor{
		meeting_record_repository: meeting_record_repository,
	}
}

// Execute implements IGetMeetingRecordInteractor.
func (g *GetMeetingRecordInteractor) Execute(ctx context.Context, issueID string) (*output.GetMeetingRecordOutput, error) {
	meetingRecord, err := g.meeting_record_repository.GetMeetingRecordOnce(ctx, issueID)
	if err != nil {
		return nil, err
	}

	output := &output.GetMeetingRecordOutput{
		MeetingRecord: meetingRecord,
	}

	return output, nil
}
