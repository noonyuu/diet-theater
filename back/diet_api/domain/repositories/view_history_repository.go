package repositories

import (
	"context"
	"diet-theater/back/diet_api/domain/entities"
)

type IViewHistoryRepository interface {
	GetViewHistory(ctx context.Context, user_id string) (*entities.ViewHistory, error)
	CreateViewHistory(ctx context.Context, viewHistory *entities.ViewHistory) (uint, error)
}
