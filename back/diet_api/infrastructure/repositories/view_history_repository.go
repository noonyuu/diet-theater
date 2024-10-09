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
func (v *ViewHistoryRepository) CreateViewHistory(ctx context.Context, viewHistory *entities.ViewHistory) (*entities.ViewHistory, error) {
	view_history := models.FromViewHistoryDomainModel(viewHistory)

	if err := v.db.WithContext(ctx).Create(&view_history).Error; err != nil {
		return nil, err
	}

	return view_history.ToDomainViewHistoryModel(), nil
}

// GetViewHistory implements repositories.IViewHistoryRepository.
func (v *ViewHistoryRepository) GetViewHistory(ctx context.Context, user_id string) ([]*entities.ViewHistory, error) {
	view_history := []*models.ViewHistory{}

	if err := v.db.WithContext(ctx).Where("user_id = ?", user_id).Find(&view_history).Error; err != nil {
		return nil, err
	}

	var view_history_domain []*entities.ViewHistory
	for _, view := range view_history {
		view_history_domain = append(view_history_domain, view.ToDomainViewHistoryModel())
	}

	return view_history_domain, nil
}
