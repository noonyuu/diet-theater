package presenters

import (
	"diet-theater/back/diet_api/api"
	"diet-theater/back/diet_api/usecases/dto/output"
	"net/http"

	"github.com/gin-gonic/gin"
)

type IViewHistoryPresenter interface {
	PresentCreateViewHistory(c *gin.Context, output *output.CreateViewHistoryOutput)
	PresentGetViewHistory(c *gin.Context, output *output.GetViewHistoryOutput)
}

// 構造体の定義
type ViewHistoryPresenter struct{}

func NewViewHistoryPresenter() IViewHistoryPresenter {
	return &ViewHistoryPresenter{}
}

// PresentCreateViewHistory implements IViewHistoryPresenter.
func (v *ViewHistoryPresenter) PresentCreateViewHistory(c *gin.Context, output *output.CreateViewHistoryOutput) {
	id := int(output.ViewHistory.GetID())
	res := api.ViewHistory{
		Id:      id,
		UserId:  output.ViewHistory.GetUserID(),
		IssueId: output.ViewHistory.GetIssueID(),
	}

	c.JSON(http.StatusOK, res)
}

// PresentGetViewHistory implements IViewHistoryPresenter.
func (v *ViewHistoryPresenter) PresentGetViewHistory(c *gin.Context, output *output.GetViewHistoryOutput) {
	var res []api.ViewHistory
	for _, viewHistory := range output.ViewHistory {
		id := int(viewHistory.GetID())
		res = append(res, api.ViewHistory{
			Id:      id,
			UserId:  viewHistory.GetUserID(),
			IssueId: viewHistory.GetIssueID(),
		})
	}

	c.JSON(http.StatusOK, res)
}
