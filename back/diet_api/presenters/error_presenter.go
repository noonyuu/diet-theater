package presenters

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type IErrorPresenter interface {
	PresentBadRequest(c *gin.Context, message string)
	PresentInternalServerError(c *gin.Context, err string)
	PresentNotFound(c *gin.Context, message string)
}

// 構造体の定義
type ErrorPresenter struct{}

func NewErrorPresenter() IErrorPresenter {
	return &ErrorPresenter{}
}

// PresentBadRequest implements IErrorPresenter.
func (p *ErrorPresenter) PresentBadRequest(c *gin.Context, message string) {
	res := struct {
		Error string `json:"error"`
	}{
		Error: message,
	}

	c.JSON(http.StatusBadRequest, res)
}

// PresentInternalServerError implements IErrorPresenter.
func (p *ErrorPresenter) PresentInternalServerError(c *gin.Context, message string) {
	res := struct {
		Error string `json:"error"`
	}{
		Error: message,
	}

	c.JSON(http.StatusInternalServerError, res)
}

// PresentNotFound implements IErrorPresenter.
func (p *ErrorPresenter) PresentNotFound(c *gin.Context, message string) {
	res := struct {
		Error string `json:"error"`
	}{
		Error: message,
	}

	c.JSON(http.StatusNotFound, res)
}
