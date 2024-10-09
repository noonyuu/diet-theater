package view_history

import (
	"context"
	"diet-theater/back/diet_api/domain/entities"
	"diet-theater/back/diet_api/domain/repositories"
	"diet-theater/back/diet_api/usecases/dto/input"
	"diet-theater/back/diet_api/usecases/dto/output"
)

type ICreateViewHistoryInteractor interface {
	Execute(ctx context.Context, r *input.CreateViewHistoryInput) (*output.CreateViewHistoryOutput, error)
}

type CreateViewHistoryInteractor struct {
	view_history_repository repositories.IViewHistoryRepository
}

func NewViewHistoryInteractor(
	view_history_repository repositories.IViewHistoryRepository,
) ICreateViewHistoryInteractor {
	return &CreateViewHistoryInteractor{
		view_history_repository: view_history_repository,
	}
}

// Execute implements ICreateViewHistoryInteractor.
func (c *CreateViewHistoryInteractor) Execute(ctx context.Context, r *input.CreateViewHistoryInput) (*output.CreateViewHistoryOutput, error) {
	viewHistory := entities.NewViewHistory(
		r.ID,
		r.UserID,
		r.IssueID,
	)
	viewHistory, err := c.view_history_repository.CreateViewHistory(ctx, viewHistory)
	if err != nil {
		return nil, err
	}

	output := &output.CreateViewHistoryOutput{
		ViewHistory: viewHistory,
	}

	return output, nil
}
