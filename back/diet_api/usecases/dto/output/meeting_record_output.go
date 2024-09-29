package output

import "diet-theater/back/diet_api/domain/entities"

type CreateMeetingRecordOutput struct {
	MeetingRecord *entities.MeetingRecord
}

type GetMeetingRecordOutput struct {
	MeetingRecord *entities.MeetingRecord
}

type GetMeetingRecordAllOutput struct {
	MeetingRecord []*entities.MeetingRecord
}
