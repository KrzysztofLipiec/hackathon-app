import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { http } from '@google-cloud/functions-framework'
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';

dotenv.config();
const server = express()

export const createNestServer = async (expressInstance) => {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance))
    const globalPrefix = 'api'
    app.setGlobalPrefix(globalPrefix)
    app.enableCors()
    return app.init()
}

createNestServer(server)
    .then((v) => {
            if (!process.env.DEVELOPMENT) {
                Logger.log('🚀 Starting production server...')
            } else {
                Logger.log(`🚀 Starting development server on http://localhost:${process.env.PORT || 3000}`)
                v.listen(process.env.PORT || 3000)
            }
        },
    )
    .catch((err) => Logger.error('Nest broken', err))

export const hackathonApp = server;
