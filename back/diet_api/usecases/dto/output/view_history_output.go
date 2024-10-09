package output

import "diet-theater/back/diet_api/domain/entities"

type CreateViewHistoryOutput struct {
	ViewHistory *entities.ViewHistory
}

type GetViewHistoryOutput struct {
	ViewHistory []*entities.ViewHistory
}
