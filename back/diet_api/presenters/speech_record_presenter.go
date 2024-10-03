package presenters

import (
	"diet-theater/back/diet_api/api"
	"diet-theater/back/diet_api/usecases/dto/output"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ISpeechRecordPresenter interface {
	PresentCreateSpeechRecord(c *gin.Context, output *output.CreateSpeechRecordOutput)
	PresentGetSpeechRecordAll(c * gin.Context, output *output.GetSpeechRecordAllOutput)
	PresentGetSpeechRecordOnce(c * gin.Context, output *output.GetSpeechRecordOnceOutput)
}

// 構造体の定義
type SpeechRecordPresenter struct{}

func NewSpeechRecordPresenter() ISpeechRecordPresenter {
	return &SpeechRecordPresenter{}
}

// PresentCreateSpeechRecord implements ISpeechRecordRepository.
func (s *SpeechRecordPresenter) PresentCreateSpeechRecord(c *gin.Context, output *output.CreateSpeechRecordOutput) {
	res := []api.SpeechRecord{}

	for _, record := range output.SpeechRecord {
		res = append(res, api.SpeechRecord{
			Id:              int(record.GetID()),
			IssueId:         record.GetIssueID(),
			SpeechId:        record.GetSpeechID(),
			Speaker:         record.GetSpeaker(),
			SpeakerYomi:     record.GetSpeakerYomi(),
			SpeakerRole:     record.GetSpeakerRole(),
			SpeakerGroup:    record.GetSpeakerGroup(),
			SpeakerPosition: record.GetSpeakerPosition(),
			SpeechOrigin:    record.GetSpeechOrigin(),
			SpeechSummary:   record.GetSpeechSummary(),
			AnimationPoint:  record.GetAnimationPoint(),
		})
	}
	c.JSON(http.StatusOK, res)
}

func (s *SpeechRecordPresenter) PresentGetSpeechRecordAll(c *gin.Context, output *output.GetSpeechRecordAllOutput) {
	res := []api.SpeechRecord{}

	for _, record := range output.SpeechRecord {
		res = append(res, api.SpeechRecord{
			Id:              int(record.GetID()),
			IssueId:         record.GetIssueID(),
			SpeechId:        record.GetSpeechID(),
			Speaker:         record.GetSpeaker(),
			SpeakerYomi:     record.GetSpeakerYomi(),
			SpeakerRole:     record.GetSpeakerRole(),
			SpeakerGroup:    record.GetSpeakerGroup(),
			SpeakerPosition: record.GetSpeakerPosition(),
			SpeechOrigin:    record.GetSpeechOrigin(),
			SpeechSummary:   record.GetSpeechSummary(),
			AnimationPoint:  record.GetAnimationPoint(),
		})
	}
	c.JSON(http.StatusOK, res)
}

func (s *SpeechRecordPresenter) PresentGetSpeechRecordOnce(c * gin.Context, output *output.GetSpeechRecordOnceOutput) {
	res := api.SpeechRecord{
		Id:              int(output.SpeechRecord.GetID()),
		IssueId:         output.SpeechRecord.GetIssueID(),
		SpeechId:        output.SpeechRecord.GetSpeechID(),
		Speaker:         output.SpeechRecord.GetSpeaker(),
		SpeakerYomi:     output.SpeechRecord.GetSpeakerYomi(),
		SpeakerRole:     output.SpeechRecord.GetSpeakerRole(),
		SpeakerGroup:    output.SpeechRecord.GetSpeakerGroup(),
		SpeakerPosition: output.SpeechRecord.GetSpeakerPosition(),
		SpeechOrigin:    output.SpeechRecord.GetSpeechOrigin(),
		SpeechSummary:   output.SpeechRecord.GetSpeechSummary(),
		AnimationPoint:  output.SpeechRecord.GetAnimationPoint(),
	}
	c.JSON(http.StatusOK, res)
}
