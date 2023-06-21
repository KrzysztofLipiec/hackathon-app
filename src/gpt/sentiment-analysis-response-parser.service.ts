import { IProcessedSentimentAnalysisResponse } from './interfaces/IProcessedSentimentAnalysisResponse';

export class SentimentAnalysisResponseParserService {
    public process(response: string): IProcessedSentimentAnalysisResponse {
        const [score, reason, actions] = response.split('-');
        return {
            reason: reason.trim(),
            score: parseInt(score),
            actions: actions.trim(),
        };
    }
}
