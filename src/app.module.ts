import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GptModule } from './gpt/gpt.module';

@Module({
    imports: [GptModule],
    controllers: [AppController],
    providers: [],
})
export class AppModule {
}
