// Package api provides primitives to interact with the openapi HTTP API.
//
// Code generated by github.com/oapi-codegen/oapi-codegen/v2 version v2.4.1 DO NOT EDIT.
package api

import (
	"bytes"
	"compress/gzip"
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"path"
	"strings"
	"time"

	"github.com/getkin/kin-openapi/openapi3"
	"github.com/gin-gonic/gin"
	"github.com/oapi-codegen/runtime"
	strictgin "github.com/oapi-codegen/runtime/strictmiddleware/gin"
)

// MeetingRecord defines model for MeetingRecord.
type MeetingRecord struct {
	CreatedAt     time.Time 
	Date          string    
	DeletedAt     time.Time 
	Id            int       
	Issue         string    
	IssueId       string    
	NameOfHouse   string    
	NameOfMeeting string    
	Session       int       
	UpdatedAt     time.Time 
}

// SpeechRecord defines model for SpeechRecord.
type SpeechRecord struct {
	AnimationPoint  string
	Id              int       
	IssueId         string    
	Speaker         string    
	SpeakerGroup    string    
	SpeakerPosition string    
	SpeakerRole     string    
	SpeakerYomi     string    
	SpeechId        string    
	SpeechOrigin    string    
	SpeechSummary   string
}

// PostViewHistoryInsertJSONBody defines parameters for PostViewHistoryInsert.
type PostViewHistoryInsertJSONBody struct {
	CreatedAt *time.Time `json:"created_at,omitempty"`
	IssueId   *string    `json:"issue_id,omitempty"`
	UserId    *string    `json:"user_id,omitempty"`
}

// PostMeetingRecordInsertJSONRequestBody defines body for PostMeetingRecordInsert for application/json ContentType.
type PostMeetingRecordInsertJSONRequestBody = MeetingRecord

// PostSpeechRecordInsertJSONRequestBody defines body for PostSpeechRecordInsert for application/json ContentType.
type PostSpeechRecordInsertJSONRequestBody = SpeechRecord

// PostViewHistoryInsertJSONRequestBody defines body for PostViewHistoryInsert for application/json ContentType.
type PostViewHistoryInsertJSONRequestBody PostViewHistoryInsertJSONBody

// ServerInterface represents all server handlers.
type ServerInterface interface {
	// 疎通確認用
	// (GET /)
	Get(c *gin.Context)
	// 会議レコードの登録
	// (POST /meeting-record/insert)
	PostMeetingRecordInsert(c *gin.Context)
	// 会議レコードの全件取得
	// (GET /meeting-record/select/all)
	GetMeetingRecordSelectAll(c *gin.Context)
	// 会議レコードの1件取得
	// (GET /meeting-record/select/once/{issueID})
	GetMeetingRecordSelectOnceIssueID(c *gin.Context, issueID string)
	// 発言レコードの登録
	// (POST /speech-record/insert)
	PostSpeechRecordInsert(c *gin.Context)
	// 発言レコードの全件取得
	// (GET /speech-record/select/all)
	GetSpeechRecordSelectAll(c *gin.Context)
	// 発言レコードの1件取得
	// (GET /speech-record/select/once/{issueID})
	GetSpeechRecordSelectOnceIssueID(c *gin.Context, issueID string)
	// 発言レコードの1件取得
	// (GET /speech-record/select/once/{issueID}/{speechID})
	GetSpeechRecordSelectOnceIssueIDSpeechID(c *gin.Context, issueID string, speechID string)
	// 閲覧履歴の登録
	// (POST /view-history/insert)
	PostViewHistoryInsert(c *gin.Context)
	// 閲覧履歴の取得
	// (GET /view-history/select/{userID})
	GetViewHistorySelectUserID(c *gin.Context, userID string)
}

// ServerInterfaceWrapper converts contexts to parameters.
type ServerInterfaceWrapper struct {
	Handler            ServerInterface
	HandlerMiddlewares []MiddlewareFunc
	ErrorHandler       func(*gin.Context, error, int)
}

type MiddlewareFunc func(c *gin.Context)

// Get operation middleware
func (siw *ServerInterfaceWrapper) Get(c *gin.Context) {

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.Get(c)
}

// PostMeetingRecordInsert operation middleware
func (siw *ServerInterfaceWrapper) PostMeetingRecordInsert(c *gin.Context) {

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.PostMeetingRecordInsert(c)
}

// GetMeetingRecordSelectAll operation middleware
func (siw *ServerInterfaceWrapper) GetMeetingRecordSelectAll(c *gin.Context) {

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.GetMeetingRecordSelectAll(c)
}

// GetMeetingRecordSelectOnceIssueID operation middleware
func (siw *ServerInterfaceWrapper) GetMeetingRecordSelectOnceIssueID(c *gin.Context) {

	var err error

	// ------------- Path parameter "issueID" -------------
	var issueID string

	err = runtime.BindStyledParameterWithOptions("simple", "issueID", c.Param("issueID"), &issueID, runtime.BindStyledParameterOptions{Explode: false, Required: true})
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter issueID: %w", err), http.StatusBadRequest)
		return
	}

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.GetMeetingRecordSelectOnceIssueID(c, issueID)
}

// PostSpeechRecordInsert operation middleware
func (siw *ServerInterfaceWrapper) PostSpeechRecordInsert(c *gin.Context) {

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.PostSpeechRecordInsert(c)
}

// GetSpeechRecordSelectAll operation middleware
func (siw *ServerInterfaceWrapper) GetSpeechRecordSelectAll(c *gin.Context) {

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.GetSpeechRecordSelectAll(c)
}

// GetSpeechRecordSelectOnceIssueID operation middleware
func (siw *ServerInterfaceWrapper) GetSpeechRecordSelectOnceIssueID(c *gin.Context) {

	var err error

	// ------------- Path parameter "issueID" -------------
	var issueID string

	err = runtime.BindStyledParameterWithOptions("simple", "issueID", c.Param("issueID"), &issueID, runtime.BindStyledParameterOptions{Explode: false, Required: true})
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter issueID: %w", err), http.StatusBadRequest)
		return
	}

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.GetSpeechRecordSelectOnceIssueID(c, issueID)
}

// GetSpeechRecordSelectOnceIssueIDSpeechID operation middleware
func (siw *ServerInterfaceWrapper) GetSpeechRecordSelectOnceIssueIDSpeechID(c *gin.Context) {

	var err error

	// ------------- Path parameter "issueID" -------------
	var issueID string

	err = runtime.BindStyledParameterWithOptions("simple", "issueID", c.Param("issueID"), &issueID, runtime.BindStyledParameterOptions{Explode: false, Required: true})
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter issueID: %w", err), http.StatusBadRequest)
		return
	}

	// ------------- Path parameter "speechID" -------------
	var speechID string

	err = runtime.BindStyledParameterWithOptions("simple", "speechID", c.Param("speechID"), &speechID, runtime.BindStyledParameterOptions{Explode: false, Required: true})
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter speechID: %w", err), http.StatusBadRequest)
		return
	}

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.GetSpeechRecordSelectOnceIssueIDSpeechID(c, issueID, speechID)
}

// PostViewHistoryInsert operation middleware
func (siw *ServerInterfaceWrapper) PostViewHistoryInsert(c *gin.Context) {

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.PostViewHistoryInsert(c)
}

// GetViewHistorySelectUserID operation middleware
func (siw *ServerInterfaceWrapper) GetViewHistorySelectUserID(c *gin.Context) {

	var err error

	// ------------- Path parameter "userID" -------------
	var userID string

	err = runtime.BindStyledParameterWithOptions("simple", "userID", c.Param("userID"), &userID, runtime.BindStyledParameterOptions{Explode: false, Required: true})
	if err != nil {
		siw.ErrorHandler(c, fmt.Errorf("Invalid format for parameter userID: %w", err), http.StatusBadRequest)
		return
	}

	for _, middleware := range siw.HandlerMiddlewares {
		middleware(c)
		if c.IsAborted() {
			return
		}
	}

	siw.Handler.GetViewHistorySelectUserID(c, userID)
}

// GinServerOptions provides options for the Gin server.
type GinServerOptions struct {
	BaseURL      string
	Middlewares  []MiddlewareFunc
	ErrorHandler func(*gin.Context, error, int)
}

// RegisterHandlers creates http.Handler with routing matching OpenAPI spec.
func RegisterHandlers(router gin.IRouter, si ServerInterface) {
	RegisterHandlersWithOptions(router, si, GinServerOptions{})
}

// RegisterHandlersWithOptions creates http.Handler with additional options
func RegisterHandlersWithOptions(router gin.IRouter, si ServerInterface, options GinServerOptions) {
	errorHandler := options.ErrorHandler
	if errorHandler == nil {
		errorHandler = func(c *gin.Context, err error, statusCode int) {
			c.JSON(statusCode, gin.H{"msg": err.Error()})
		}
	}

	wrapper := ServerInterfaceWrapper{
		Handler:            si,
		HandlerMiddlewares: options.Middlewares,
		ErrorHandler:       errorHandler,
	}

	router.GET(options.BaseURL+"/", wrapper.Get)
	router.POST(options.BaseURL+"/meeting-record/insert", wrapper.PostMeetingRecordInsert)
	router.GET(options.BaseURL+"/meeting-record/select/all", wrapper.GetMeetingRecordSelectAll)
	router.GET(options.BaseURL+"/meeting-record/select/once/:issueID", wrapper.GetMeetingRecordSelectOnceIssueID)
	router.POST(options.BaseURL+"/speech-record/insert", wrapper.PostSpeechRecordInsert)
	router.GET(options.BaseURL+"/speech-record/select/all", wrapper.GetSpeechRecordSelectAll)
	router.GET(options.BaseURL+"/speech-record/select/once/:issueID", wrapper.GetSpeechRecordSelectOnceIssueID)
	router.GET(options.BaseURL+"/speech-record/select/once/:issueID/:speechID", wrapper.GetSpeechRecordSelectOnceIssueIDSpeechID)
	router.POST(options.BaseURL+"/view-history/insert", wrapper.PostViewHistoryInsert)
	router.GET(options.BaseURL+"/view-history/select/:userID", wrapper.GetViewHistorySelectUserID)
}

type GetRequestObject struct {
}

type GetResponseObject interface {
	VisitGetResponse(w http.ResponseWriter) error
}

type Get200JSONResponse struct {
	Message *string `json:"message,omitempty"`
}

func (response Get200JSONResponse) VisitGetResponse(w http.ResponseWriter) error {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)

	return json.NewEncoder(w).Encode(response)
}

type PostMeetingRecordInsertRequestObject struct {
	Body *PostMeetingRecordInsertJSONRequestBody
}

type PostMeetingRecordInsertResponseObject interface {
	VisitPostMeetingRecordInsertResponse(w http.ResponseWriter) error
}

type PostMeetingRecordInsert200JSONResponse MeetingRecord

func (response PostMeetingRecordInsert200JSONResponse) VisitPostMeetingRecordInsertResponse(w http.ResponseWriter) error {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)

	return json.NewEncoder(w).Encode(response)
}

type GetMeetingRecordSelectAllRequestObject struct {
}

type GetMeetingRecordSelectAllResponseObject interface {
	VisitGetMeetingRecordSelectAllResponse(w http.ResponseWriter) error
}

type GetMeetingRecordSelectAll200JSONResponse []MeetingRecord

func (response GetMeetingRecordSelectAll200JSONResponse) VisitGetMeetingRecordSelectAllResponse(w http.ResponseWriter) error {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)

	return json.NewEncoder(w).Encode(response)
}

type GetMeetingRecordSelectOnceIssueIDRequestObject struct {
	IssueID string `json:"issueID"`
}

type GetMeetingRecordSelectOnceIssueIDResponseObject interface {
	VisitGetMeetingRecordSelectOnceIssueIDResponse(w http.ResponseWriter) error
}

type GetMeetingRecordSelectOnceIssueID200JSONResponse MeetingRecord

func (response GetMeetingRecordSelectOnceIssueID200JSONResponse) VisitGetMeetingRecordSelectOnceIssueIDResponse(w http.ResponseWriter) error {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)

	return json.NewEncoder(w).Encode(response)
}

type PostSpeechRecordInsertRequestObject struct {
	Body *PostSpeechRecordInsertJSONRequestBody
}

type PostSpeechRecordInsertResponseObject interface {
	VisitPostSpeechRecordInsertResponse(w http.ResponseWriter) error
}

type PostSpeechRecordInsert200JSONResponse SpeechRecord

func (response PostSpeechRecordInsert200JSONResponse) VisitPostSpeechRecordInsertResponse(w http.ResponseWriter) error {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)

	return json.NewEncoder(w).Encode(response)
}

type GetSpeechRecordSelectAllRequestObject struct {
}

type GetSpeechRecordSelectAllResponseObject interface {
	VisitGetSpeechRecordSelectAllResponse(w http.ResponseWriter) error
}

type GetSpeechRecordSelectAll200JSONResponse []SpeechRecord

func (response GetSpeechRecordSelectAll200JSONResponse) VisitGetSpeechRecordSelectAllResponse(w http.ResponseWriter) error {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)

	return json.NewEncoder(w).Encode(response)
}

type GetSpeechRecordSelectOnceIssueIDRequestObject struct {
	IssueID string `json:"issueID"`
}

type GetSpeechRecordSelectOnceIssueIDResponseObject interface {
	VisitGetSpeechRecordSelectOnceIssueIDResponse(w http.ResponseWriter) error
}

type GetSpeechRecordSelectOnceIssueID200JSONResponse SpeechRecord

func (response GetSpeechRecordSelectOnceIssueID200JSONResponse) VisitGetSpeechRecordSelectOnceIssueIDResponse(w http.ResponseWriter) error {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)

	return json.NewEncoder(w).Encode(response)
}

type GetSpeechRecordSelectOnceIssueIDSpeechIDRequestObject struct {
	IssueID  string `json:"issueID"`
	SpeechID string `json:"speechID"`
}

type GetSpeechRecordSelectOnceIssueIDSpeechIDResponseObject interface {
	VisitGetSpeechRecordSelectOnceIssueIDSpeechIDResponse(w http.ResponseWriter) error
}

type GetSpeechRecordSelectOnceIssueIDSpeechID200JSONResponse SpeechRecord

func (response GetSpeechRecordSelectOnceIssueIDSpeechID200JSONResponse) VisitGetSpeechRecordSelectOnceIssueIDSpeechIDResponse(w http.ResponseWriter) error {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)

	return json.NewEncoder(w).Encode(response)
}

type PostViewHistoryInsertRequestObject struct {
	Body *PostViewHistoryInsertJSONRequestBody
}

type PostViewHistoryInsertResponseObject interface {
	VisitPostViewHistoryInsertResponse(w http.ResponseWriter) error
}

type PostViewHistoryInsert200JSONResponse struct {
	Message *string `json:"message,omitempty"`
}

func (response PostViewHistoryInsert200JSONResponse) VisitPostViewHistoryInsertResponse(w http.ResponseWriter) error {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)

	return json.NewEncoder(w).Encode(response)
}

type GetViewHistorySelectUserIDRequestObject struct {
	UserID string `json:"userID"`
}

type GetViewHistorySelectUserIDResponseObject interface {
	VisitGetViewHistorySelectUserIDResponse(w http.ResponseWriter) error
}

type GetViewHistorySelectUserID200JSONResponse []struct {
	CreatedAt *time.Time `json:"created_at,omitempty"`
	IssueId   *string    `json:"issue_id,omitempty"`
}

func (response GetViewHistorySelectUserID200JSONResponse) VisitGetViewHistorySelectUserIDResponse(w http.ResponseWriter) error {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)

	return json.NewEncoder(w).Encode(response)
}

// StrictServerInterface represents all server handlers.
type StrictServerInterface interface {
	// 疎通確認用
	// (GET /)
	Get(ctx context.Context, request GetRequestObject) (GetResponseObject, error)
	// 会議レコードの登録
	// (POST /meeting-record/insert)
	PostMeetingRecordInsert(ctx context.Context, request PostMeetingRecordInsertRequestObject) (PostMeetingRecordInsertResponseObject, error)
	// 会議レコードの全件取得
	// (GET /meeting-record/select/all)
	GetMeetingRecordSelectAll(ctx context.Context, request GetMeetingRecordSelectAllRequestObject) (GetMeetingRecordSelectAllResponseObject, error)
	// 会議レコードの1件取得
	// (GET /meeting-record/select/once/{issueID})
	GetMeetingRecordSelectOnceIssueID(ctx context.Context, request GetMeetingRecordSelectOnceIssueIDRequestObject) (GetMeetingRecordSelectOnceIssueIDResponseObject, error)
	// 発言レコードの登録
	// (POST /speech-record/insert)
	PostSpeechRecordInsert(ctx context.Context, request PostSpeechRecordInsertRequestObject) (PostSpeechRecordInsertResponseObject, error)
	// 発言レコードの全件取得
	// (GET /speech-record/select/all)
	GetSpeechRecordSelectAll(ctx context.Context, request GetSpeechRecordSelectAllRequestObject) (GetSpeechRecordSelectAllResponseObject, error)
	// 発言レコードの1件取得
	// (GET /speech-record/select/once/{issueID})
	GetSpeechRecordSelectOnceIssueID(ctx context.Context, request GetSpeechRecordSelectOnceIssueIDRequestObject) (GetSpeechRecordSelectOnceIssueIDResponseObject, error)
	// 発言レコードの1件取得
	// (GET /speech-record/select/once/{issueID}/{speechID})
	GetSpeechRecordSelectOnceIssueIDSpeechID(ctx context.Context, request GetSpeechRecordSelectOnceIssueIDSpeechIDRequestObject) (GetSpeechRecordSelectOnceIssueIDSpeechIDResponseObject, error)
	// 閲覧履歴の登録
	// (POST /view-history/insert)
	PostViewHistoryInsert(ctx context.Context, request PostViewHistoryInsertRequestObject) (PostViewHistoryInsertResponseObject, error)
	// 閲覧履歴の取得
	// (GET /view-history/select/{userID})
	GetViewHistorySelectUserID(ctx context.Context, request GetViewHistorySelectUserIDRequestObject) (GetViewHistorySelectUserIDResponseObject, error)
}

type StrictHandlerFunc = strictgin.StrictGinHandlerFunc
type StrictMiddlewareFunc = strictgin.StrictGinMiddlewareFunc

func NewStrictHandler(ssi StrictServerInterface, middlewares []StrictMiddlewareFunc) ServerInterface {
	return &strictHandler{ssi: ssi, middlewares: middlewares}
}

type strictHandler struct {
	ssi         StrictServerInterface
	middlewares []StrictMiddlewareFunc
}

// Get operation middleware
func (sh *strictHandler) Get(ctx *gin.Context) {
	var request GetRequestObject

	handler := func(ctx *gin.Context, request interface{}) (interface{}, error) {
		return sh.ssi.Get(ctx, request.(GetRequestObject))
	}
	for _, middleware := range sh.middlewares {
		handler = middleware(handler, "Get")
	}

	response, err := handler(ctx, request)

	if err != nil {
		ctx.Error(err)
		ctx.Status(http.StatusInternalServerError)
	} else if validResponse, ok := response.(GetResponseObject); ok {
		if err := validResponse.VisitGetResponse(ctx.Writer); err != nil {
			ctx.Error(err)
		}
	} else if response != nil {
		ctx.Error(fmt.Errorf("unexpected response type: %T", response))
	}
}

// PostMeetingRecordInsert operation middleware
func (sh *strictHandler) PostMeetingRecordInsert(ctx *gin.Context) {
	var request PostMeetingRecordInsertRequestObject

	var body PostMeetingRecordInsertJSONRequestBody
	if err := ctx.ShouldBindJSON(&body); err != nil {
		ctx.Status(http.StatusBadRequest)
		ctx.Error(err)
		return
	}
	request.Body = &body

	handler := func(ctx *gin.Context, request interface{}) (interface{}, error) {
		return sh.ssi.PostMeetingRecordInsert(ctx, request.(PostMeetingRecordInsertRequestObject))
	}
	for _, middleware := range sh.middlewares {
		handler = middleware(handler, "PostMeetingRecordInsert")
	}

	response, err := handler(ctx, request)

	if err != nil {
		ctx.Error(err)
		ctx.Status(http.StatusInternalServerError)
	} else if validResponse, ok := response.(PostMeetingRecordInsertResponseObject); ok {
		if err := validResponse.VisitPostMeetingRecordInsertResponse(ctx.Writer); err != nil {
			ctx.Error(err)
		}
	} else if response != nil {
		ctx.Error(fmt.Errorf("unexpected response type: %T", response))
	}
}

// GetMeetingRecordSelectAll operation middleware
func (sh *strictHandler) GetMeetingRecordSelectAll(ctx *gin.Context) {
	var request GetMeetingRecordSelectAllRequestObject

	handler := func(ctx *gin.Context, request interface{}) (interface{}, error) {
		return sh.ssi.GetMeetingRecordSelectAll(ctx, request.(GetMeetingRecordSelectAllRequestObject))
	}
	for _, middleware := range sh.middlewares {
		handler = middleware(handler, "GetMeetingRecordSelectAll")
	}

	response, err := handler(ctx, request)

	if err != nil {
		ctx.Error(err)
		ctx.Status(http.StatusInternalServerError)
	} else if validResponse, ok := response.(GetMeetingRecordSelectAllResponseObject); ok {
		if err := validResponse.VisitGetMeetingRecordSelectAllResponse(ctx.Writer); err != nil {
			ctx.Error(err)
		}
	} else if response != nil {
		ctx.Error(fmt.Errorf("unexpected response type: %T", response))
	}
}

// GetMeetingRecordSelectOnceIssueID operation middleware
func (sh *strictHandler) GetMeetingRecordSelectOnceIssueID(ctx *gin.Context, issueID string) {
	var request GetMeetingRecordSelectOnceIssueIDRequestObject

	request.IssueID = issueID

	handler := func(ctx *gin.Context, request interface{}) (interface{}, error) {
		return sh.ssi.GetMeetingRecordSelectOnceIssueID(ctx, request.(GetMeetingRecordSelectOnceIssueIDRequestObject))
	}
	for _, middleware := range sh.middlewares {
		handler = middleware(handler, "GetMeetingRecordSelectOnceIssueID")
	}

	response, err := handler(ctx, request)

	if err != nil {
		ctx.Error(err)
		ctx.Status(http.StatusInternalServerError)
	} else if validResponse, ok := response.(GetMeetingRecordSelectOnceIssueIDResponseObject); ok {
		if err := validResponse.VisitGetMeetingRecordSelectOnceIssueIDResponse(ctx.Writer); err != nil {
			ctx.Error(err)
		}
	} else if response != nil {
		ctx.Error(fmt.Errorf("unexpected response type: %T", response))
	}
}

// PostSpeechRecordInsert operation middleware
func (sh *strictHandler) PostSpeechRecordInsert(ctx *gin.Context) {
	var request PostSpeechRecordInsertRequestObject

	var body PostSpeechRecordInsertJSONRequestBody
	if err := ctx.ShouldBindJSON(&body); err != nil {
		ctx.Status(http.StatusBadRequest)
		ctx.Error(err)
		return
	}
	request.Body = &body

	handler := func(ctx *gin.Context, request interface{}) (interface{}, error) {
		return sh.ssi.PostSpeechRecordInsert(ctx, request.(PostSpeechRecordInsertRequestObject))
	}
	for _, middleware := range sh.middlewares {
		handler = middleware(handler, "PostSpeechRecordInsert")
	}

	response, err := handler(ctx, request)

	if err != nil {
		ctx.Error(err)
		ctx.Status(http.StatusInternalServerError)
	} else if validResponse, ok := response.(PostSpeechRecordInsertResponseObject); ok {
		if err := validResponse.VisitPostSpeechRecordInsertResponse(ctx.Writer); err != nil {
			ctx.Error(err)
		}
	} else if response != nil {
		ctx.Error(fmt.Errorf("unexpected response type: %T", response))
	}
}

// GetSpeechRecordSelectAll operation middleware
func (sh *strictHandler) GetSpeechRecordSelectAll(ctx *gin.Context) {
	var request GetSpeechRecordSelectAllRequestObject

	handler := func(ctx *gin.Context, request interface{}) (interface{}, error) {
		return sh.ssi.GetSpeechRecordSelectAll(ctx, request.(GetSpeechRecordSelectAllRequestObject))
	}
	for _, middleware := range sh.middlewares {
		handler = middleware(handler, "GetSpeechRecordSelectAll")
	}

	response, err := handler(ctx, request)

	if err != nil {
		ctx.Error(err)
		ctx.Status(http.StatusInternalServerError)
	} else if validResponse, ok := response.(GetSpeechRecordSelectAllResponseObject); ok {
		if err := validResponse.VisitGetSpeechRecordSelectAllResponse(ctx.Writer); err != nil {
			ctx.Error(err)
		}
	} else if response != nil {
		ctx.Error(fmt.Errorf("unexpected response type: %T", response))
	}
}

// GetSpeechRecordSelectOnceIssueID operation middleware
func (sh *strictHandler) GetSpeechRecordSelectOnceIssueID(ctx *gin.Context, issueID string) {
	var request GetSpeechRecordSelectOnceIssueIDRequestObject

	request.IssueID = issueID

	handler := func(ctx *gin.Context, request interface{}) (interface{}, error) {
		return sh.ssi.GetSpeechRecordSelectOnceIssueID(ctx, request.(GetSpeechRecordSelectOnceIssueIDRequestObject))
	}
	for _, middleware := range sh.middlewares {
		handler = middleware(handler, "GetSpeechRecordSelectOnceIssueID")
	}

	response, err := handler(ctx, request)

	if err != nil {
		ctx.Error(err)
		ctx.Status(http.StatusInternalServerError)
	} else if validResponse, ok := response.(GetSpeechRecordSelectOnceIssueIDResponseObject); ok {
		if err := validResponse.VisitGetSpeechRecordSelectOnceIssueIDResponse(ctx.Writer); err != nil {
			ctx.Error(err)
		}
	} else if response != nil {
		ctx.Error(fmt.Errorf("unexpected response type: %T", response))
	}
}

// GetSpeechRecordSelectOnceIssueIDSpeechID operation middleware
func (sh *strictHandler) GetSpeechRecordSelectOnceIssueIDSpeechID(ctx *gin.Context, issueID string, speechID string) {
	var request GetSpeechRecordSelectOnceIssueIDSpeechIDRequestObject

	request.IssueID = issueID
	request.SpeechID = speechID

	handler := func(ctx *gin.Context, request interface{}) (interface{}, error) {
		return sh.ssi.GetSpeechRecordSelectOnceIssueIDSpeechID(ctx, request.(GetSpeechRecordSelectOnceIssueIDSpeechIDRequestObject))
	}
	for _, middleware := range sh.middlewares {
		handler = middleware(handler, "GetSpeechRecordSelectOnceIssueIDSpeechID")
	}

	response, err := handler(ctx, request)

	if err != nil {
		ctx.Error(err)
		ctx.Status(http.StatusInternalServerError)
	} else if validResponse, ok := response.(GetSpeechRecordSelectOnceIssueIDSpeechIDResponseObject); ok {
		if err := validResponse.VisitGetSpeechRecordSelectOnceIssueIDSpeechIDResponse(ctx.Writer); err != nil {
			ctx.Error(err)
		}
	} else if response != nil {
		ctx.Error(fmt.Errorf("unexpected response type: %T", response))
	}
}

// PostViewHistoryInsert operation middleware
func (sh *strictHandler) PostViewHistoryInsert(ctx *gin.Context) {
	var request PostViewHistoryInsertRequestObject

	var body PostViewHistoryInsertJSONRequestBody
	if err := ctx.ShouldBindJSON(&body); err != nil {
		ctx.Status(http.StatusBadRequest)
		ctx.Error(err)
		return
	}
	request.Body = &body

	handler := func(ctx *gin.Context, request interface{}) (interface{}, error) {
		return sh.ssi.PostViewHistoryInsert(ctx, request.(PostViewHistoryInsertRequestObject))
	}
	for _, middleware := range sh.middlewares {
		handler = middleware(handler, "PostViewHistoryInsert")
	}

	response, err := handler(ctx, request)

	if err != nil {
		ctx.Error(err)
		ctx.Status(http.StatusInternalServerError)
	} else if validResponse, ok := response.(PostViewHistoryInsertResponseObject); ok {
		if err := validResponse.VisitPostViewHistoryInsertResponse(ctx.Writer); err != nil {
			ctx.Error(err)
		}
	} else if response != nil {
		ctx.Error(fmt.Errorf("unexpected response type: %T", response))
	}
}

// GetViewHistorySelectUserID operation middleware
func (sh *strictHandler) GetViewHistorySelectUserID(ctx *gin.Context, userID string) {
	var request GetViewHistorySelectUserIDRequestObject

	request.UserID = userID

	handler := func(ctx *gin.Context, request interface{}) (interface{}, error) {
		return sh.ssi.GetViewHistorySelectUserID(ctx, request.(GetViewHistorySelectUserIDRequestObject))
	}
	for _, middleware := range sh.middlewares {
		handler = middleware(handler, "GetViewHistorySelectUserID")
	}

	response, err := handler(ctx, request)

	if err != nil {
		ctx.Error(err)
		ctx.Status(http.StatusInternalServerError)
	} else if validResponse, ok := response.(GetViewHistorySelectUserIDResponseObject); ok {
		if err := validResponse.VisitGetViewHistorySelectUserIDResponse(ctx.Writer); err != nil {
			ctx.Error(err)
		}
	} else if response != nil {
		ctx.Error(fmt.Errorf("unexpected response type: %T", response))
	}
}

// Base64 encoded, gzipped, json marshaled Swagger object
var swaggerSpec = []string{

	"H4sIAAAAAAAC/+RYYU/bRhj+K+y2jyFOgG1dvnWatPJhWjW67cOEIs95Sa6zfbe7M10URcKh0Faj7abS",
	"IPjS0XYFodGFbmonqNiPOUKSfzHdOaSJcRLSAOtWZCHHvud9z8/73POeXUAWcShxwRUcpQqIWzlwTH36",
	"GYDAbvYLsAjLqAuUEQpMYNC3LQamgEzaFOoX/GA61AaUQmOJseRoQh1XEomUPlAMzRDmqJEoYwoYFdgB",
	"FEMiTxWCC4bdLCrG9M1u0SLHgw2nPQec6YiVbA3BroAsMD2Gcy880chYalw6FBElx8Yn3v/gwwsftZ9E",
	"wV3TgTSZSeeIx0Pp6uuL9e1KY/VhL5wTVLATebB7s/Z05eDlWn27EgXmwDkmbn8SPJo5ZQEUW1fIt1fB",
	"EirLFAWwct1EaLrYMQUmbpoS7IYmEimZM5HtvynD15cXp2B+B6wTXd3ZqS1Xqo+3GvN3eoDSWUY8GtLk",
	"ja3a8s5h5eeDv/aqC2u90JRwLMIqQ9XFhUb5Ue3F3dpPi9XHG/Ubj3rFYMQOLYrqxnL13nrj/otesDxx",
	"cCdMlq5Lf1/6v0j/gSzdlv5iFzxYuWNsBwwnWlwHZz0CEIazOPTg0r8nS0vS/1GWbkn/dznnx+PxHjG4",
	"5zgmy4cWtl7S0t84LFekvyL964fLf9e2y9Jfqq3u1tc3pX9fZ9nXdx/IuVJUivNY1uoSdmeIyiCw0PEv",
	"Xp4cuaLPY2gWWOBBKBlPqEkRCq5JMUqh8XgirtRMTZHTFmCof1nQs1XWoO1gMoNS6FMQKIYYcEpcHvjF",
	"WCKhexdxBQR2YVJqY0uDjKs8UGTQBI+7jQOcm9mQ6C6BbZPYyNeE2Zl32v5OykMGuMUwDVYD4p5lAecj",
	"rSfRsFa9Ua18pzG3Vnu4W9+6XVveVEnMLEepb1AGZkzPFmhaAYym9Y8ybZwGdjkw/byU8AiqLhMuOvr9",
	"ZABQ9H3vARcfk0x+IObeYzCDUuhd49X+wmhuLozOnYVmQaXBDDIoJZgHxSHLNmDywUrQXGfzv8nSH3L+",
	"pZy/Jf2ntdW9xtKztnIc9d7IcnCwwRKGadu9xNsx0ykNuWjbw0oaC3D4gCS1hGsyZuZPjbTqwubB3vPq",
	"3XJ1f2VA6ohrgVHQDXDyk+KALH7uWjAZQLWTMNMBAUwlL4Seq75dOVy/qccp09a2g4IdlurFrSCd+o21",
	"8R02gen/nLaT/YsU9KVB3KZ9X3emZtOxgTxnrzmee0C3X92tb871s5qA/MhKnMxo2qd5vj7TSdDwNhNJ",
	"WBeb6U/byU3mOIP/W485E00nT6NARiEYNEytppoRzr9msXCKgKhuKfirib7VupjFcG00h7kgLH+ixvMV",
	"hmuXgvFD952z/yI25Cu+x4G9Ljr6deV0m+cb937VKD+rP9mo7vx6uP1nVK9Vcks35RalwKYxFRTxfXyo",
	"TYiBDX2pMf2cR84/Ucuj9LybM3hHYc7PF1q9/g1fEFEfGIfdcoQUc8ytworRn1jZ7FFxPWajFMoJQXnK",
	"MGximXaOcJG6MDExbpiUGqg4XfwnAAD//7pVHm+mFwAA",
}

// GetSwagger returns the content of the embedded swagger specification file
// or error if failed to decode
func decodeSpec() ([]byte, error) {
	zipped, err := base64.StdEncoding.DecodeString(strings.Join(swaggerSpec, ""))
	if err != nil {
		return nil, fmt.Errorf("error base64 decoding spec: %w", err)
	}
	zr, err := gzip.NewReader(bytes.NewReader(zipped))
	if err != nil {
		return nil, fmt.Errorf("error decompressing spec: %w", err)
	}
	var buf bytes.Buffer
	_, err = buf.ReadFrom(zr)
	if err != nil {
		return nil, fmt.Errorf("error decompressing spec: %w", err)
	}

	return buf.Bytes(), nil
}

var rawSpec = decodeSpecCached()

// a naive cached of a decoded swagger spec
func decodeSpecCached() func() ([]byte, error) {
	data, err := decodeSpec()
	return func() ([]byte, error) {
		return data, err
	}
}

// Constructs a synthetic filesystem for resolving external references when loading openapi specifications.
func PathToRawSpec(pathToFile string) map[string]func() ([]byte, error) {
	res := make(map[string]func() ([]byte, error))
	if len(pathToFile) > 0 {
		res[pathToFile] = rawSpec
	}

	return res
}

// GetSwagger returns the Swagger specification corresponding to the generated code
// in this file. The external references of Swagger specification are resolved.
// The logic of resolving external references is tightly connected to "import-mapping" feature.
// Externally referenced files must be embedded in the corresponding golang packages.
// Urls can be supported but this task was out of the scope.
func GetSwagger() (swagger *openapi3.T, err error) {
	resolvePath := PathToRawSpec("")

	loader := openapi3.NewLoader()
	loader.IsExternalRefsAllowed = true
	loader.ReadFromURIFunc = func(loader *openapi3.Loader, url *url.URL) ([]byte, error) {
		pathToFile := url.String()
		pathToFile = path.Clean(pathToFile)
		getSpec, ok := resolvePath[pathToFile]
		if !ok {
			err1 := fmt.Errorf("path not found: %s", pathToFile)
			return nil, err1
		}
		return getSpec()
	}
	var specData []byte
	specData, err = rawSpec()
	if err != nil {
		return
	}
	swagger, err = loader.LoadFromData(specData)
	if err != nil {
		return
	}
	return
}
