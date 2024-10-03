package controllers

import (
	"diet-theater/back/diet_api/api"
	"diet-theater/back/diet_api/presenters"
	"diet-theater/back/diet_api/usecases/dto/input"
	usecases "diet-theater/back/diet_api/usecases/speech_record"

	"github.com/gin-gonic/gin"
)

type SpeechRecordController struct {
	createSpeechRecordInteractor  usecases.ICreateSpeechRecordInteractor
	getSpeechRecordAllInteractor  usecases.IGetSpeechRecordAllInteractor
	getSpeechRecordOnceInteractor usecases.IGetSpeechRecordOnceInteractor
	speechRecordPresenter         presenters.ISpeechRecordPresenter
	errorPresenter                presenters.IErrorPresenter
}

func NewSpeechRecordController(
	createSpeechRecordInteractor usecases.ICreateSpeechRecordInteractor,
	getMeetingRecordAllInteractor usecases.IGetSpeechRecordAllInteractor,
	getSpeechRecordOnceInteractor usecases.IGetSpeechRecordOnceInteractor,
	speechRecordPresenter presenters.ISpeechRecordPresenter,
	errorPresenter presenters.IErrorPresenter,
) *SpeechRecordController {
	return &SpeechRecordController{
		createSpeechRecordInteractor:  createSpeechRecordInteractor,
		getSpeechRecordAllInteractor:  getMeetingRecordAllInteractor,
		getSpeechRecordOnceInteractor: getSpeechRecordOnceInteractor,
		speechRecordPresenter:         speechRecordPresenter,
		errorPresenter:                errorPresenter,
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
	// 標準のcontext.Contextを取得できる
	ctx := g.Request.Context()

	output, err := c.createSpeechRecordInteractor.Execute(ctx, inputs)
	if err != nil {
		c.errorPresenter.PresentInternalServerError(g, err.Error())
	}

	c.speechRecordPresenter.PresentCreateSpeechRecord(g, output)
}

func (c *SpeechRecordController) GetSpeechRecordAll(g *gin.Context) {
	// 標準のcontext.Contextを取得できる
	ctx := g.Request.Context()

	output, err := c.getSpeechRecordAllInteractor.Execute(ctx)
	if err != nil {
		c.errorPresenter.PresentInternalServerError(g, err.Error())
	}

	c.speechRecordPresenter.PresentGetSpeechRecordAll(g, output)
}

func (c *SpeechRecordController) GetSpeechRecordOnce(g *gin.Context, issueID string) {
	// 標準のcontext.Contextを取得できる
	ctx := g.Request.Context()
	output, err := c.getSpeechRecordOnceInteractor.Execute(ctx, issueID)
	if err != nil {
		c.errorPresenter.PresentInternalServerError(g, err.Error())
		return
	}

	// output または output.MeetingRecord がnilでないかをチェック
	if output == nil || output.SpeechRecord == nil {
		c.errorPresenter.PresentNotFound(g, "speech record not found")
		return
	}

	// 会議記録をレスポンスとして返す
	c.speechRecordPresenter.PresentGetSpeechRecordOnce(g, output)
}
