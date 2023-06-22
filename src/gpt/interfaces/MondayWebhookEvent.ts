export interface MondayWebhookResponse {
    event: MondayWebhookEvent
}

export interface MondayWebhookEvent {
    userId: number,
    originalTriggerUuid: string,
    boardId: number,
    pulseId: number,
    pulseName: string,
    groupId: string,
    groupName: string,
    groupColor: string,
    isTopGroup: true,
    columnValues: any,
    app: string,
    type: string,
    triggerTime: string,
    subscriptionId: number,
    triggerUuid: string
}