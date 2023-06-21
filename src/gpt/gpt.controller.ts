import { Body, Controller, Delete, Get, Param, Post, Query, Res } from '@nestjs/common';
import { HandleGptError } from './handle-gpt.error';
import { GptService } from './gpt.service';
import { SentimentalAnalysisResponse } from './dto/SentimentalAnalysisResponse';
import { SentimentalAnalysisRequest } from './dto/SentimentalAnalysisRequest';
import { AssessmentRequest } from './dto/AssessmentRequest';
import { MongoDbService } from '../db/mongo/mongoDb.service';

@Controller('/gpt')
export class GptController {

    constructor(
        private gptService: GptService,
        private mongoDbService: MongoDbService,
    ) {

    }

    @Get('config')
    public async getConfig(@Query('workspace') workspace: string, @Query('name') name: string) {
        return this.mongoDbService.getRecord(workspace, name);
    }

    @Post('config')
    public async setConfig(@Body() { name, value, workspace }: { name: string, value: any, workspace: string }) {
        return this.mongoDbService.addRecord(workspace, name, value);
    }

    @Delete('config')
    public async deleteConfig(@Body() { name, value, workspace }: { name: string, value: string, workspace: string }) {
        return this.mongoDbService.removeRecord(workspace, name, value);
    }

    @Post('get-assessment')
    @HandleGptError()
    public async generateAssessment(@Res() res, @Body() assessmentRequest: AssessmentRequest) {
        const response = await this.gptService.generateAssessment(assessmentRequest.user, assessmentRequest.data);
        return res.status(200).json(response);
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
            ...(await this.gptService.generateSentimentAnalysis(item.review, item.updates)),
        };
    }
}
