package repositories

import (
	"context"
	"diet-theater/back/diet_api/domain/entities"
	"diet-theater/back/diet_api/domain/repositories"
	"diet-theater/back/diet_api/infrastructure/models"

	"gorm.io/gorm"
)

type ViewHistoryRepository struct {
	db *gorm.DB
}

func NewViewHistoryRepository(db *gorm.DB) repositories.IViewHistoryRepository {
	return &ViewHistoryRepository{
		db: db,
	}
}

// CreateViewHistory implements repositories.IViewHistoryRepository.
func (v *ViewHistoryRepository) CreateViewHistory(ctx context.Context, viewHistory *entities.ViewHistory) (uint, error) {
	view_history := models.FromViewHistoryDomainModel(viewHistory)

	result := v.db.Create(&view_history)
	if result.Error != nil {
		return 0, result.Error
	}

	return view_history.ID, nil
}

// GetViewHistory implements repositories.IViewHistoryRepository.
func (v *ViewHistoryRepository) GetViewHistory(ctx context.Context, user_id string) (*entities.ViewHistory, error) {
	view_history := &models.ViewHistory{}
	result := v.db.Where("user_id = ?", user_id).First(&view_history)
	if result.Error != nil {
		return nil, result.Error
	}

	return view_history.ToDomainViewHistoryModel(), nil
}
