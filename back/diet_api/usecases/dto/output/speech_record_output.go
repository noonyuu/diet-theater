package output

import "diet-theater/back/diet_api/domain/entities"

type CreateSpeechRecordOutput struct {
	SpeechRecord []*entities.SpeechRecord
}

type GetSpeechRecordAllOutput struct {
	SpeechRecord []*entities.SpeechRecord
}

type GetSpeechRecordOnceOutput struct {
	SpeechRecord []*entities.SpeechRecord
}

type GetSpeechRecordOnceBySpeechIDOutput struct {
	SpeechRecord *entities.SpeechRecord
}
