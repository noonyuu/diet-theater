package controllers

import (
	"diet-theater/back/diet_api/api"
	"diet-theater/back/diet_api/presenters"
	"diet-theater/back/diet_api/usecases/dto/input"
	usecases "diet-theater/back/diet_api/usecases/meeting_record"

	"github.com/gin-gonic/gin"
)

type MeetingRecordController struct {
	createMeetingRecordInteractor usecases.ICreateMeetingRecordInteractor
	getMeetingRecordInteractor    usecases.IGetMeetingRecordInteractor
	getMeetingRecordAllInteractor usecases.IGetMeetingRecordAllInteractor
	meetingRecordPresenter        presenters.IMeetingRecordPresenter
	errorPresenter                presenters.IErrorPresenter
}

func NewMeetingRecordController(
	createMeetingRecordInteractor usecases.ICreateMeetingRecordInteractor,
	getMeetingRecordInteractor usecases.IGetMeetingRecordInteractor,
	getMeetingRecordAllInteractor usecases.IGetMeetingRecordAllInteractor,
	meetingRecordPresenter presenters.IMeetingRecordPresenter,
	errorPresenter presenters.IErrorPresenter,
) *MeetingRecordController {
	return &MeetingRecordController{
		createMeetingRecordInteractor: createMeetingRecordInteractor,
		getMeetingRecordInteractor:    getMeetingRecordInteractor,
		getMeetingRecordAllInteractor: getMeetingRecordAllInteractor,
		meetingRecordPresenter:        meetingRecordPresenter,
		errorPresenter:                errorPresenter,
	}
}

func (c *MeetingRecordController) CreateMeetingRecord(g *gin.Context) {
	req := api.MeetingRecord{}
	if err := g.Bind(&req); err != nil {
		c.errorPresenter.PresentBadRequest(g, "invalid request")
	}

	input := &input.CreateMeetingRecordInput{
		Id:            uint(req.Id),
		IssueId:       req.IssueId,
		Session:       req.Session,
		NameOfHouse:   req.NameOfHouse,
		NameOfMeeting: req.NameOfMeeting,
		Issue:         req.Issue,
		Date:          req.Date,
	}

	// 標準のcontext.Context を取得できる
	ctx := g.Request.Context()

	output, err := c.createMeetingRecordInteractor.Execute(ctx, input)
	if err != nil {
		c.errorPresenter.PresentInternalServerError(g, err.Error())
	}

	c.meetingRecordPresenter.PresentCreateMeetingRecord(g, output)
}

func (c *MeetingRecordController) GetMeetingRecordOnce(g *gin.Context, issueId string) {

	ctx := g.Request.Context()

	// GetMeetingRecordInteractorを使用して会議記録を取得
	output, err := c.getMeetingRecordInteractor.Execute(ctx, issueId)
	if err != nil {
		c.errorPresenter.PresentInternalServerError(g, err.Error())
		return
	}

	// output または output.MeetingRecord が cnil でないかをチェック
	if output == nil || output.MeetingRecord == nil {
		c.errorPresenter.PresentNotFound(g, "meeting record not found")
		return
	}

	// 会議記録をレスポンスとして返す
	c.meetingRecordPresenter.PresentGetMeetingRecord(g, output)
}

func (c *MeetingRecordController) GetMeetingRecordAll(g *gin.Context) {
	ctx := g.Request.Context()

	// GetMeetingRecordAllInteractorを使用して全ての会議記録を取得
	output, err := c.getMeetingRecordAllInteractor.Execute(ctx)
	if err != nil {
		c.errorPresenter.PresentInternalServerError(g, err.Error())
		return
	}

	// 会議記録をレスポンスとして返す
	c.meetingRecordPresenter.PresentGetMeetingRecordAll(g, output)
}
