package repositories

import (
	"context"
	"diet-theater/back/diet_api/domain/entities"
)

type IMeetingRecordRepository interface {
	GetMeetingRecordOnce(ctx context.Context, issueID string) (*entities.MeetingRecord, error)
	GetMeetingRecordAll(ctx context.Context) ([]*entities.MeetingRecord, error)
	CreateMeetingRecord(ctx context.Context, meetingRecord *entities.MeetingRecord) (*entities.MeetingRecord, error)
}
