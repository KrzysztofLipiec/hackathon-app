import { IProcessedSentimentAnalysisResponse } from './interfaces/IProcessedSentimentAnalysisResponse';

export class SentimentAnalysisResponseParserService {
    public process(response: string): IProcessedSentimentAnalysisResponse {
        const [score, reason] = response.split('-');
        return {
            reason: reason.trim(),
            score: parseInt(score),
            actions: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        };
    }
}
