package infrastructure

import (
	"diet-theater/back/diet_api/controllers"
	"diet-theater/back/diet_api/infrastructure/repositories"
	"diet-theater/back/diet_api/presenters"
	"diet-theater/back/diet_api/usecases/meeting_record"

	"go.uber.org/dig"
)

func BuildContainer() *dig.Container {
	c := dig.New()

	c.Provide(NewServer)
	c.Provide(NewDB)

	c.Provide(controllers.NewMeetingRecordController)

	c.Provide(presenters.NewMeetingRecordPresenter)
	c.Provide(presenters.NewErrorPresenter)

	c.Provide(usecases.NewMeetingRecordInteractor)
	c.Provide(usecases.NewGetMeetingRecordInteractor)
	c.Provide(usecases.NewGetMeetingRecordAllInteractor)

	c.Provide(repositories.NewMeetingRecordRepository)

	return c
}
