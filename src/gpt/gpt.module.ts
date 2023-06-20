import { Module } from '@nestjs/common';
import { GptController } from './gpt.controller';
import { GptService } from './gpt.service';
import { GptResponseParserService } from './gpt-response-parser.service';

@Module({
    imports: [],
    providers: [
        GptService,
        GptResponseParserService,
    ],
    controllers: [
        GptController,
    ],
})
export class GptModule {
}
