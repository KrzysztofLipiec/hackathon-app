import { IProcessedGptResponse } from './interfaces/IProcessedGptResponse';

export class GptResponseParserService {
    public process(response: string): IProcessedGptResponse {
        const [score, reason] = response.split('-');
        return {
            reason: reason.trim(),
            score: parseInt(score),
        };
    }
}
