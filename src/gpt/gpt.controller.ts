import { Body, Controller, Post, Res } from '@nestjs/common';
import { HandleGptError } from './handle-gpt.error';
import { GptService } from './gpt.service';
import { SentimentalAnalysisResponse } from './dto/SentimentalAnalysisResponse';
import { SentimentalAnalysisRequest } from './dto/SentimentalAnalysisRequest';

@Controller('/gpt')
export class GptController {
    constructor(
        private gptService: GptService,
    ) {

    }

    @Post('sentiment-analysis')
    @HandleGptError()
    public async generateHappinessRate(
        @Res() res,
        @Body() sentimentalAnalysisRequest: SentimentalAnalysisRequest | SentimentalAnalysisRequest[],
    ): Promise<SentimentalAnalysisResponse> {
        let response: SentimentalAnalysisResponse | SentimentalAnalysisResponse[];

        if (Array.isArray(sentimentalAnalysisRequest)) {
            response = await Promise.all(sentimentalAnalysisRequest.map((item) => this.buildItemResponse(item)));
        } else {
            response = await this.buildItemResponse(sentimentalAnalysisRequest);
        }

        return res.status(200).json(response);
    }

    private async buildItemResponse(item: SentimentalAnalysisRequest): Promise<SentimentalAnalysisResponse> {
        return {
            id: item.id,
            ...(await this.gptService.generateSentimentAnalysis(item.review, item.updates || [])),
        };
    }
}
