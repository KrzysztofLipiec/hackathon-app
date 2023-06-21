import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GptModule } from './gpt/gpt.module';
import { MongoDbService } from './db/mongo/mongoDb.service';

@Module({
    imports: [GptModule],
    controllers: [AppController],
    providers: [MongoDbService],
})
export class AppModule {
}
