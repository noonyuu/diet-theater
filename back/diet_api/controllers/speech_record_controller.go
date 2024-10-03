package controllers

import (
	"diet-theater/back/diet_api/api"
	"diet-theater/back/diet_api/presenters"
	"diet-theater/back/diet_api/usecases/dto/input"
	usecases "diet-theater/back/diet_api/usecases/speech_record"
	"fmt"

	"github.com/gin-gonic/gin"
)

type SpeechRecordController struct {
	createSpeechRecordInteractor usecases.ICreateSpeechRecordInteractor
	speechRecordPresenter        presenters.ISpeechRecordPresenter
	errorPresenter               presenters.IErrorPresenter
}

func NewSpeechRecordController(
	createSpeechRecordInteractor usecases.ICreateSpeechRecordInteractor,
	speechRecordPresenter presenters.ISpeechRecordPresenter,
	errorPresenter presenters.IErrorPresenter,
) *SpeechRecordController {
	return &SpeechRecordController{
		createSpeechRecordInteractor: createSpeechRecordInteractor,
		speechRecordPresenter:        speechRecordPresenter,
		errorPresenter:               errorPresenter,
	}
}

func (c *SpeechRecordController) CreateSpeechRecord(g *gin.Context) {
	req := []api.SpeechRecord{}
	if err := g.Bind(&req); err != nil {
		c.errorPresenter.PresentBadRequest(g, "invalid request")
	}

	inputs := []*input.CreateSpeechRecordInput{}

	for _, r := range req {
		input := &input.CreateSpeechRecordInput{
			Id:              uint(r.Id),
			IssueId:         r.IssueId,
			SpeechId:        r.SpeechId,
			Speaker:         r.Speaker,
			SpeakerYomi:     r.SpeakerYomi,
			SpeakerRole:     r.SpeakerRole,
			SpeakerGroup:    r.SpeakerGroup,
			SpeakerPosition: r.SpeakerPosition,
			SpeechOrigin:    r.SpeechOrigin,
			SpeechSummary:   r.SpeechSummary,
			AnimationPoint:  r.AnimationPoint,
		}

		inputs = append(inputs, input)
	}

	fmt.Println("IssueId:", req)
	// 標準のcontext.Contextを取得できる
	ctx := g.Request.Context()

	output, err := c.createSpeechRecordInteractor.Execute(ctx, inputs)
	if err != nil {
		c.errorPresenter.PresentInternalServerError(g, err.Error())
	}

	c.speechRecordPresenter.PresentCreateSpeechRecord(g, output)
}
