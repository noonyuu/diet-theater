package input

type CreateSpeechRecordInput struct {
	Id              uint       
	IssueId         string    
	SpeechId        string    
	Speaker         string    
	SpeakerGroup    string    
	SpeakerPosition string    
	SpeakerRole     string    
	SpeakerYomi     string    
	SpeechOrigin    string    
	SpeechSummary   string
	AnimationPoint  string
}
