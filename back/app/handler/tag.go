package handler

import (
	"api/model"
	"net/http"

	"github.com/labstack/echo/v4"
)

// タグの登録
func CreateTag(c echo.Context) error {
	tag := new(model.Tag)
	if err := c.Bind(tag); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	if err := model.RegisterTag(tag); err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}
	return c.JSON(http.StatusCreated, tag)
}

// タグの全件取得
func GetTagList(c echo.Context) error {
	var tags []model.Tag
	if err := model.GetAllTags(&tags); err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}
	return c.JSON(http.StatusOK, tags)
}
