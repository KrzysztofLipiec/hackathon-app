import { AbstractPrompt } from './abstract.prompt';

export class SentimentAnalysisPrompt extends AbstractPrompt {
    public generatePrompt(data: { review: string, updates: string[] }) {
        return `On a scale of 1 to 5, 1 being unhappy and 5 being very happy,
    what would be the hapiness of the customer based on their review and updates?
    Updates are sorted from the eldest to the newest, please consider whole updating process, if problem was solved, if communication was clear for evaluation.
    Also what is the main reason for the score based on the review?
    
    Review: The product helped me a lot, and solved all of my problems! Thanks!
    Updates: no updates
    Result: 5 - The user's need were fulfilled completely.
    
    Review: It's a very good product. It's missing a few functionalities, but we can use it.
    Updates: 
        - could you tell us what is missing?
        - yes sure, we would need to add suffix at the end of the each users name.
        - thanks for your update, we will deliver it soon.
    Result: 4 - The user is satisfied with the product, but feels it might have more features.
    
    Review: It was ok, I guess. Didn't know how to do some of the stuff.
    Updates: 
        - which areas of the application was missing for you.
        - could you help us understand what was not clear for you?
        - I dont know how to change some settings.
        - you would need to click cog on the right top corner.
        - found it thank you
    Result: 3 - The user did not understand how to use the product, so their experience could not exactly be classified as positive, but we were able to slightly guide him to move forward.
    
    Review: It worked for some time and then crashed. Haven't been able to use it since then.
    Update: 
        - We were able to see logs of this accident but we dont see any issue
        - It just stopped
        - Please message us if it will happen again
    Result: 2 - While having a good start with the app, after breaking the user could not use it anymore but the problem is not resolved.
    
    Review: It doesn't work at all for me.
    Update: 
        - no updates
    Result: 1 - The user did not get any expected results from the product and no action from updates were taken.
    
    Review: ${data.review}
    Updates: 
        ${data.updates?.length ? data.updates.map((update) => `- ${update}\n`) : '- no updates'}
    Result:`
    }
}
