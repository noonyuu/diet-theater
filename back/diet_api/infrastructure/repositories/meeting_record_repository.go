package repositories

import (
	"context"
	"diet-theater/back/diet_api/domain/entities"
	"diet-theater/back/diet_api/domain/repositories"
	"diet-theater/back/diet_api/infrastructure/models"
	"log"

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
func (m *MeetingRecordRepository) CreateMeetingRecord(ctx context.Context, meetingRecord *entities.MeetingRecord) (uint, error) {
	meeting_record := models.FromMeetingDomainModel(meetingRecord)

	result := m.db.Create(&meeting_record)
	if result.Error != nil {
		log.Fatal(result.Error)
		return 0, result.Error
	}

	return meeting_record.ID, nil
}

// GetMeetingRecordAll implements repositories.IMeetingRecordRepository.
func (m *MeetingRecordRepository) GetMeetingRecordAll(ctx context.Context) ([]*entities.MeetingRecord, error) {
	meeting_records := []*models.MeetingRecord{}
	result := m.db.Find(&meeting_records)
	if result.Error != nil {
		log.Fatal(result.Error)
		return nil, result.Error
	}

	var meeting_records_domain []*entities.MeetingRecord
	for _, meeting_record := range meeting_records {
		meeting_records_domain = append(meeting_records_domain, meeting_record.ToDomainMeetingModel())
	}

	return meeting_records_domain, nil
}

// GetMeetingRecordOnce implements repositories.IMeetingRecordRepository.
func (m *MeetingRecordRepository) GetMeetingRecordOnce(ctx context.Context, issue_id uint) (*entities.MeetingRecord, error) {
	meeting_record := &models.MeetingRecord{}
	result := m.db.Where("issue_id = ?", issue_id).First(&meeting_record)
	if result.Error != nil {
		log.Fatal(result.Error)
		return nil, result.Error
	}

	return meeting_record.ToDomainMeetingModel(), nil
}
