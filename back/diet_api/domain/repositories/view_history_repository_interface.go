package repositories

import (
	"api/domain/entities"
	"context"
)

type IViewHistoryRepository interface {
	GetViewHistory(ctx context.Context) (*entities.ViewHistory, error)
	CreateViewHistory(ctx context.Context, viewHistory *entities.ViewHistory) (uint, error)
}
