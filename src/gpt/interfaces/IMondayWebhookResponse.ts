import { MondayWebhookEvent } from "./MondayWebhookEvent";

export interface IMondayWebhookResponse {
    challenge?: string;
    event?: MondayWebhookEvent;
}