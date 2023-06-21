import { Module } from '@nestjs/common';
import { GptController } from './gpt.controller';
import { GptService } from './gpt.service';
import { SentimentAnalysisResponseParserService } from './sentiment-analysis-response-parser.service';
import { MongoDbService } from '../db/mongo/mongoDb.service';

@Module({
    imports: [],
    providers: [
        GptService,
        SentimentAnalysisResponseParserService,
        MongoDbService,
    ],
    controllers: [
        GptController,
    ],
})
export class GptModule {
}
