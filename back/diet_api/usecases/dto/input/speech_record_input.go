package input

type CreateSpeechRecordInput struct {
	SpeechRecordID  uint
	IssueID         string
	SpeechID        string
	Speaker         string
	SpeakerYomi     string
	SpeakerRole     string
	SpeakerGroup    string
	SpeakerPosition string
	SpeechOrigin    string
	SpeechSummary   string
	AnimationPoint  string
}
