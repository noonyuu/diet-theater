package infrastructure

import (
	"diet-theater/back/diet_api/api"
	"diet-theater/back/diet_api/controllers"
	"log"

	"github.com/gin-gonic/gin"
)

type Server struct {
	meetingRecordController *controllers.MeetingRecordController
	speechRecordController  *controllers.SpeechRecordController
}

func NewServer(
	meetingRecordController *controllers.MeetingRecordController,
	speechRecordController *controllers.SpeechRecordController,
) *Server {
	return &Server{
		meetingRecordController: meetingRecordController,
		speechRecordController:  speechRecordController,
	}
}

func (s *Server) Get(ctx *gin.Context) {
	ctx.JSON(200, gin.H{
		"connect": "ok!",
	})
}

// GetMeetingRecordSelectAll implements api.ServerInterface.
func (s *Server) GetMeetingRecordSelectAll(c *gin.Context) {
	s.meetingRecordController.GetMeetingRecordAll(c)
}

// GetMeetingRecordSelectOnceIssueID implements api.ServerInterface.
func (s *Server) GetMeetingRecordSelectOnceIssueID(c *gin.Context, issueID string) {
	s.meetingRecordController.GetMeetingRecordOnce(c, issueID)
}

// PostMeetingRecordInsert implements api.ServerInterface.
func (s *Server) PostMeetingRecordInsert(c *gin.Context) {
	s.meetingRecordController.CreateMeetingRecord(c)
}

// GetSpeechRecordSelectAll implements api.ServerInterface.
func (s *Server) GetSpeechRecordSelectAll(c *gin.Context) {
	s.speechRecordController.GetSpeechRecordAll(c)
}

// GetSpeechRecordSelectOnceIssueID implements api.ServerInterface.
func (s *Server) GetSpeechRecordSelectOnceIssueID(c *gin.Context, issueID string) {
	s.speechRecordController.GetSpeechRecordOnce(c, issueID)
}

// GetSpeechRecordSelectOnceIssueIDSpeechID implements api.ServerInterface.
func (s *Server) GetSpeechRecordSelectOnceIssueIDSpeechID(c *gin.Context, issueID string, speechID string) {
	s.speechRecordController.GetSpeechRecordBySpeechID(c, issueID, speechID)
}

// GetViewHistorySelectUserID implements api.ServerInterface.
func (s *Server) GetViewHistorySelectUserID(c *gin.Context, userID string) {
	panic("unimplemented")
}

// PostSpeechRecordInsert implements api.ServerInterface.
func (s *Server) PostSpeechRecordInsert(c *gin.Context) {
	s.speechRecordController.CreateSpeechRecord(c)
}

// PostViewHistoryInsert implements api.ServerInterface.
func (s *Server) PostViewHistoryInsert(c *gin.Context) {
	panic("unimplemented")
}

func InitRouter() {
	r := gin.Default()

	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	c := BuildContainer()

	var server *Server
	if err := c.Invoke(func(s *Server) {
		server = s
	}); err != nil {
		panic(err)
	}

	// ハンドラの登録
	api.RegisterHandlers(r, server)
	log.Println("Server is running!")
	if err := r.Run("0.0.0.0:8089"); err != nil {
		panic(err)
	}
}
