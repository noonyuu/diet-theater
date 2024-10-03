package meeting_record

import (
	"context"
	"diet-theater/back/diet_api/domain/entities"
	"diet-theater/back/diet_api/domain/repositories"
	"diet-theater/back/diet_api/usecases/dto/input"
	"diet-theater/back/diet_api/usecases/dto/output"
)

type ICreateMeetingRecordInteractor interface {
	Execute(ctx context.Context, r *input.CreateMeetingRecordInput) (*output.CreateMeetingRecordOutput, error)
}

type CreateMeetingRecordInteractor struct {
	meeting_record_repository repositories.IMeetingRecordRepository
}

func NewMeetingRecordInteractor(
	meeting_record_repository repositories.IMeetingRecordRepository,
) ICreateMeetingRecordInteractor {
	return &CreateMeetingRecordInteractor{
		meeting_record_repository: meeting_record_repository,
	}
}

// Execute implements ICreateMeetingRecordInteractor.
func (c *CreateMeetingRecordInteractor) Execute(ctx context.Context, r *input.CreateMeetingRecordInput) (*output.CreateMeetingRecordOutput, error) {
	meetingRecord := entities.NewMeetingRecord(
		r.Id,
		r.IssueId,
		r.Session,
		r.NameOfHouse,
		r.NameOfMeeting,
		r.Issue,
		r.Date,
	)
	meetingRecord, err := c.meeting_record_repository.CreateMeetingRecord(ctx, meetingRecord)
	if err != nil {
		return nil, err
	}

	output := &output.CreateMeetingRecordOutput{
		MeetingRecord: meetingRecord,
	}

	return output, nil
}
