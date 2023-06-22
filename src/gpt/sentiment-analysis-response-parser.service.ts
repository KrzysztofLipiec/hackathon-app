import { IProcessedSentimentAnalysisResponse } from './interfaces/IProcessedSentimentAnalysisResponse';
import { Logger } from '@nestjs/common';

export class SentimentAnalysisResponseParserService {
    public process(response: string): IProcessedSentimentAnalysisResponse {
        const [score, reason, actions] = response.split('-');
        Logger.log(`Score: ${score}, reason: ${reason}, actions: ${actions}`);
        if (!reason || !score) {
            throw new Error('reason or score is empty');
        }
        if (!actions) {
            throw new Error('actions is empty');
        }
        return {
            reason: (reason || "").trim(),
            score: parseInt(score),
            actions: (actions || "").trim(),
        };
    }
}
