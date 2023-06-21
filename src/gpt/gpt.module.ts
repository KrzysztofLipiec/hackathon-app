import { Module } from '@nestjs/common';
import { GptController } from './gpt.controller';
import { GptService } from './gpt.service';
import { SentimentAnalysisResponseParserService } from './sentiment-analysis-response-parser.service';

@Module({
    imports: [],
    providers: [
        GptService,
        SentimentAnalysisResponseParserService,
    ],
    controllers: [
        GptController,
    ],
})
export class GptModule {
}
