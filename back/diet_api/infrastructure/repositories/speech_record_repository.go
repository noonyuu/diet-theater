package repositories

import (
	"context"
	"diet-theater/back/diet_api/domain/entities"
	"diet-theater/back/diet_api/domain/repositories"
	"diet-theater/back/diet_api/infrastructure/models"
	"log"

	"gorm.io/gorm"
)

type SpeechRecordRepository struct {
	db *gorm.DB
}

func NewSpeechRecordRepository(db *gorm.DB) repositories.ISpeechRecordRepository {
	return &SpeechRecordRepository{
		db: db,
	}
}

// CreateSpeechRecord implements repositories.ISpeechRecordRepository.
func (s *SpeechRecordRepository) CreateSpeechRecord(ctx context.Context, speechRecord []*entities.SpeechRecord) ([]*entities.SpeechRecord, error) {
	// スライス全体を変換する
	speech_record := models.FromSpeechDomainModels(speechRecord)

	if err := s.db.WithContext(ctx).Create(&speech_record).Error; err != nil {
		return nil, err
	}

	// ドメインモデルに変換する
	createdSpeechRecords := []*entities.SpeechRecord{}
	for _, record := range speech_record {
		createdSpeechRecords = append(createdSpeechRecords, record.ToDomainSpeechModel())
	}

	return createdSpeechRecords, nil
}

// GetSpeechRecordAll implements repositories.ISpeechRecordRepository.
func (s *SpeechRecordRepository) GetSpeechRecordAll(ctx context.Context) ([]*entities.SpeechRecord, error) {
	speech_records := []*models.SpeechRecord{}
	result := s.db.Find(&speech_records)
	if result.Error != nil {
		log.Fatal(result.Error)
		return nil, result.Error
	}

	var speech_records_domain []*entities.SpeechRecord
	for _, speech_record := range speech_records {
		speech_records_domain = append(speech_records_domain, speech_record.ToDomainSpeechModel())
	}

	return speech_records_domain, nil
}

// GetSpeechRecordOnce implements repositories.ISpeechRecordRepository.
func (s *SpeechRecordRepository) GetSpeechRecordOnce(ctx context.Context, issueId string) (*entities.SpeechRecord, error) {
	speech_record := &models.SpeechRecord{}
	result := s.db.Where("issue_id = ?", issueId).First(&speech_record)
	if result.Error != nil {
		log.Fatal(result.Error)
		return nil, result.Error
	}

	return speech_record.ToDomainSpeechModel(), nil
}

// GetSpeechRecordOnceBySpeechID implements repositories.ISpeechRecordRepository.
func (s *SpeechRecordRepository) GetSpeechRecordOnceBySpeechID(ctx context.Context, issueId string, speechId string) (*entities.SpeechRecord, error) {
	speech_record := &models.SpeechRecord{}
	result := s.db.Where("issue_id = ? AND speech_id = ?", issueId, speechId).First(&speech_record)
	if result.Error != nil {
		log.Fatal(result.Error)
		return nil, result.Error
	}

	return speech_record.ToDomainSpeechModel(), nil
}
