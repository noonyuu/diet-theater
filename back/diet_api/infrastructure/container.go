package infrastructure

import (
	"diet-theater/back/diet_api/controllers"
	"diet-theater/back/diet_api/infrastructure/repositories"
	"diet-theater/back/diet_api/presenters"
	"diet-theater/back/diet_api/usecases/meeting_record"
	"diet-theater/back/diet_api/usecases/speech_record"

	"go.uber.org/dig"
)

func BuildContainer() *dig.Container {
	c := dig.New()

	c.Provide(NewServer)
	c.Provide(NewDB)

	// controllers
	c.Provide(controllers.NewMeetingRecordController)
	c.Provide(controllers.NewSpeechRecordController)

	// presenters
	c.Provide(presenters.NewMeetingRecordPresenter)
	c.Provide(presenters.NewSpeechRecordPresenter)
	c.Provide(presenters.NewErrorPresenter)

	// usecases
	c.Provide(meeting_record.NewMeetingRecordInteractor)
	c.Provide(meeting_record.NewGetMeetingRecordInteractor)
	c.Provide(meeting_record.NewGetMeetingRecordAllInteractor)

	c.Provide(speech_record.NewSpeechRecordInteractor)

	c.Provide(speech_record.NewGetSpeechRecordAllInteractor)
	c.Provide(speech_record.NewGetSpeechRecordOnceInteractor)

	// repositories
	c.Provide(repositories.NewMeetingRecordRepository)
	c.Provide(repositories.NewSpeechRecordRepository)

	return c
}
