import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { SentimentAnalysisResponseParserService } from './sentiment-analysis-response-parser.service';
import { IProcessedSentimentAnalysisResponse } from './interfaces/IProcessedSentimentAnalysisResponse';
import { SentimentAnalysisPrompt } from './prompts/sentiment-analysis.prompt';
import { AssessmentPrompt } from './prompts/assessment.prompt';
import { AssessmentDataMapper } from './assessment-data-mapper';
import { AssessmentItem } from './dto/AssessmentItem';

@Injectable()
export class GptService {
    private static model = 'text-davinci-003';
    private configuration = new Configuration({
        apiKey: process.env.OPEN_API_KEY,
    });

    private openai = new OpenAIApi(this.configuration);

    constructor(private sentimentAnalysisResponseParserService: SentimentAnalysisResponseParserService) {
    }

    public async generateSentimentAnalysis(review: string, updates: string[]): Promise<IProcessedSentimentAnalysisResponse> {
        const prompt = this.generatePrompt(review, updates);
        const completion = await this.openai.createCompletion(
            {
                max_tokens: 100,
                model: GptService.model,
                prompt,
                temperature: 0.6,
            },
        );

        return this.sentimentAnalysisResponseParserService.process((completion.data.choices || [])[0].text || '');
    }

    public async generateAssessment(user: string, items: AssessmentItem[]): Promise<string> {
        const prompt = (new AssessmentPrompt()).generatePrompt({ user, items });
        console.log(prompt);
        // const completion = await this.openai.createCompletion(
        //     {
        //         max_tokens: 1000,
        //         model: GptService.model,
        //         prompt,
        //         temperature: 1.1,
        //     },
        // );

        // return (completion.data.choices || [])[0].text || '';
        return 'lorem ipsum dolor sit amet';
    }

    private generatePrompt(review: string, updates: string[]) {
        return (new SentimentAnalysisPrompt()).generatePrompt({ review, updates });
    }
}
