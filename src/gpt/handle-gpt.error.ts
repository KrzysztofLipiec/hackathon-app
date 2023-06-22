import { Response } from 'express';
import { Logger } from '@nestjs/common';

class GptErrorHandling {
    public evaluate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const ref = descriptor.value;
        descriptor.value = async function (response: Response, ...args) {
            try {
                await ref.call(this, response, ...args);
            } catch (e) {
                console.error(e);
                Logger.error(e);
                response.status(400).send('Can\'t correctly evaluate AI answer');
            }
        }
    }

}

export function HandleGptError() {
    const gptErrorHandling = new GptErrorHandling()
    return gptErrorHandling.evaluate;
}
