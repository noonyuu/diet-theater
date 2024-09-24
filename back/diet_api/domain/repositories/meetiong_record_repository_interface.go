package repositories

import (
	"context"
	"diet-theater/back/diet_api/domain/entities"
)

type IMeetingRecordRepository interface {
	GetMeetingRecordOnce(ctx context.Context, issue_id uint) (*entities.MeetingRecord, error)
	GetMeetingRecordAll(ctx context.Context) ([]*entities.MeetingRecord, error)
	CreateMeetingRecord(ctx context.Context, meetingRecord *entities.MeetingRecord) (uint, error)
}
