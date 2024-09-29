package repositories

import (
	"context"
	"diet-theater/back/diet_api/domain/entities"
	"diet-theater/back/diet_api/domain/repositories"
	"diet-theater/back/diet_api/infrastructure/models"
	"errors"

	"gorm.io/gorm"
)

type MeetingRecordRepository struct {
	db *gorm.DB
}

func NewMeetingRecordRepository(db *gorm.DB) repositories.IMeetingRecordRepository {
	return &MeetingRecordRepository{
		db: db,
	}
}

// CreateMeetingRecord implements repositories.IMeetingRecordRepository.
func (m *MeetingRecordRepository) CreateMeetingRecord(ctx context.Context, meetingRecord *entities.MeetingRecord) (*entities.MeetingRecord, error) {
	meeting_record := models.FromMeetingDomainModel(meetingRecord)

	if err := m.db.WithContext(ctx).Create(&meeting_record).Error; err != nil {
		return nil, err
	}

	return meeting_record.ToDomainMeetingModel(), nil
}

// GetMeetingRecordAll implements repositories.IMeetingRecordRepository.
func (m *MeetingRecordRepository) GetMeetingRecordAll(ctx context.Context) ([]*entities.MeetingRecord, error) {
	meeting_records := []*models.MeetingRecord{}

	if err := m.db.WithContext(ctx).Find(&meeting_records).Error; err != nil {
		return nil, err
	}

	var meeting_records_domain []*entities.MeetingRecord
	for _, meeting_record := range meeting_records {
		meeting_records_domain = append(meeting_records_domain, meeting_record.ToDomainMeetingModel())
	}

	return meeting_records_domain, nil
}

// GetMeetingRecordOnce implements repositories.IMeetingRecordRepository.
func (m *MeetingRecordRepository) GetMeetingRecordOnce(ctx context.Context, issue_id string) (*entities.MeetingRecord, error) {
	meeting_record := &models.MeetingRecord{}

	if err := m.db.WithContext(ctx).Where("issue_id = ?", issue_id).First(&meeting_record).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil // 見つからない場合はnilを返す
		}
		return nil, err
	}

	return meeting_record.ToDomainMeetingModel(), nil
}
