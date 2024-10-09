package controllers

import (
	"diet-theater/back/diet_api/api"
	"diet-theater/back/diet_api/presenters"
	"diet-theater/back/diet_api/usecases/dto/input"
	usecases "diet-theater/back/diet_api/usecases/view_history"

	"github.com/gin-gonic/gin"
)

type ViewHistoryController struct {
	createViewHistoryInteractor usecases.ICreateViewHistoryInteractor
	GetViewHistoryInteractor    usecases.IGetViewHistoryInteractor
	viewHistoryPresenter        presenters.IViewHistoryPresenter
	errorPresenter              presenters.IErrorPresenter
}

func NewViewHistoryController(
	createViewHistoryInteractor usecases.ICreateViewHistoryInteractor,
	GetViewHistoryInteractor usecases.IGetViewHistoryInteractor,
	viewHistoryPresenter presenters.IViewHistoryPresenter,
	errorPresenter presenters.IErrorPresenter,
) *ViewHistoryController {
	return &ViewHistoryController{
		createViewHistoryInteractor: createViewHistoryInteractor,
		GetViewHistoryInteractor:    GetViewHistoryInteractor,
		viewHistoryPresenter:        viewHistoryPresenter,
		errorPresenter:              errorPresenter,
	}
}

func (c *ViewHistoryController) CreateViewHistory(g *gin.Context) {
	req := api.ViewHistory{}
	if err := g.Bind(&req); err != nil {
		c.errorPresenter.PresentBadRequest(g, "invalid request")
	}

	input := &input.CreateViewHistoryInput{
		ID:      uint(req.Id),
		UserID:  req.UserId,
		IssueID: req.IssueId,
	}

	// 標準のcontext.Context を取得できる
	ctx := g.Request.Context()

	output, err := c.createViewHistoryInteractor.Execute(ctx, input)
	if err != nil {
		c.errorPresenter.PresentInternalServerError(g, err.Error())
	}

	c.viewHistoryPresenter.PresentCreateViewHistory(g, output)
}

func (c *ViewHistoryController) GetViewHistory(g *gin.Context, userId string) {
	// 標準のcontext.Context を取得できる
	ctx := g.Request.Context()

	output, err := c.GetViewHistoryInteractor.Execute(ctx, userId)
	if err != nil {
		c.errorPresenter.PresentInternalServerError(g, err.Error())
		return
	}

	if output == nil {
		c.errorPresenter.PresentNotFound(g, "view history not found")
		return
	}
	// 会議記録をレスポンスとして返す
	c.viewHistoryPresenter.PresentGetViewHistory(g, output)
}
