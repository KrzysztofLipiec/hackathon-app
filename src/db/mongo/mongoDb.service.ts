import { Collection, MongoClient } from 'mongodb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MongoDbService {
    private readonly uri = 'mongodb+srv://root:Tuesday2022!@hackathon-monday.6yydmr1.mongodb.net/?retryWrites=true&w=majority';
    private client = new MongoClient(this.uri);
    private database = this.client.db('hackathon');

    constructor() {

    }

    public async getCollection(collectionName: string): Promise<Collection> {
        await this.client.connect();
        return this.database.collection(collectionName.toString());
    }

    public async addRecord(collectionName: string, name: string, value: any): Promise<void> {
        const collection = await this.getCollection(collectionName);
        const existing = await collection.findOne({ name });
        if (existing) {
            await collection.replaceOne({ name }, { name, value });
        } else {
            await collection.insertOne({ name, value });
        }
    }

    public async getRecord(collectionName: string, name: string): Promise<string> {
        const collection = await this.getCollection(collectionName.toString());
        return (await collection.findOne({ name })).value;
    }

    public async removeRecord(collectionName: string, name: string, value: string): Promise<void> {
        const collection = await this.getCollection(collectionName.toString());
        await collection.deleteOne({ name, value });
    }
}



