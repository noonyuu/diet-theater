package presenters

import (
	"diet-theater/back/diet_api/api"
	"diet-theater/back/diet_api/usecases/dto/output"
	"net/http"

	"github.com/gin-gonic/gin"
)

type IMeetingRecordPresenter interface {
	PresentCreateMeetingRecord(c *gin.Context, output *output.CreateMeetingRecordOutput)
	PresentGetMeetingRecord(c *gin.Context, output *output.GetMeetingRecordOutput)
	PresentGetMeetingRecordAll(c *gin.Context, output *output.GetMeetingRecordAllOutput)
}

// 構造体の定義
type MeetingRecordPresenter struct{}

func NewMeetingRecordPresenter() IMeetingRecordPresenter {
	return &MeetingRecordPresenter{}
}

// PresentCreateMeetingRecord implements IMeetingRecordPresenter.
func (m *MeetingRecordPresenter) PresentCreateMeetingRecord(c *gin.Context, output *output.CreateMeetingRecordOutput) {
	id := int(output.MeetingRecord.GetID())
	res := api.MeetingRecord{
		Id:            id,
		Issue:         output.MeetingRecord.GetIssue(),
		Session:       output.MeetingRecord.GetSession(),
		IssueId:       output.MeetingRecord.GetIssueID(),
		NameOfHouse:   output.MeetingRecord.GetNameOfHouse(),
		NameOfMeeting: output.MeetingRecord.GetNameOfMeeting(),
		Date:          output.MeetingRecord.GetDate(),
	}

	c.JSON(http.StatusOK, res)
}

// PresentGetMeetingRecord implements IMeetingRecordPresenter.
func (m *MeetingRecordPresenter) PresentGetMeetingRecord(c *gin.Context, output *output.GetMeetingRecordOutput) {
	id := int(output.MeetingRecord.GetID())
	res := api.MeetingRecord{
		Id:            id,
		Issue:         output.MeetingRecord.GetIssue(),
		Session:       output.MeetingRecord.GetSession(),
		IssueId:       output.MeetingRecord.GetIssueID(),
		NameOfHouse:   output.MeetingRecord.GetNameOfHouse(),
		NameOfMeeting: output.MeetingRecord.GetNameOfMeeting(),
		Date:          output.MeetingRecord.GetDate(),
	}

	c.JSON(http.StatusOK, res)
}

// PresentGetMeetingRecordAll implements IMeetingRecordPresenter.
func (m *MeetingRecordPresenter) PresentGetMeetingRecordAll(c *gin.Context, output *output.GetMeetingRecordAllOutput) {
	var res []api.MeetingRecord
	for _, meetingRecord := range output.MeetingRecord {
		id := int(meetingRecord.GetID())
		res = append(res, api.MeetingRecord{
			Id:            id,
			Issue:         meetingRecord.GetIssue(),
			Session:       meetingRecord.GetSession(),
			IssueId:       meetingRecord.GetIssueID(),
			NameOfHouse:   meetingRecord.GetNameOfHouse(),
			NameOfMeeting: meetingRecord.GetNameOfMeeting(),
			Date:          meetingRecord.GetDate(),
		})
	}

	c.JSON(http.StatusOK, res)
}
