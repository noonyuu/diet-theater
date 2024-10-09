package view_history

import (
	"context"
	"diet-theater/back/diet_api/domain/repositories"
	"diet-theater/back/diet_api/usecases/dto/output"
)

type IGetViewHistoryInteractor interface {
	Execute(ctx context.Context, userId string) (*output.GetViewHistoryOutput, error)
}

type GetViewHistoryInteractor struct {
	view_history_repository repositories.IViewHistoryRepository
}

func NewGetViewHistoryInteractor(
	view_history_repository repositories.IViewHistoryRepository,
) IGetViewHistoryInteractor {
	return &GetViewHistoryInteractor{
		view_history_repository: view_history_repository,
	}
}

// Execute implements IGetViewHistoryInteractor.
func (g *GetViewHistoryInteractor) Execute(ctx context.Context, userId string) (*output.GetViewHistoryOutput, error) {
	viewHistory, err := g.view_history_repository.GetViewHistory(ctx, userId)
	if err != nil {
		return nil, err
	}

	output := &output.GetViewHistoryOutput{
		ViewHistory: viewHistory,
	}

	return output, nil
}
