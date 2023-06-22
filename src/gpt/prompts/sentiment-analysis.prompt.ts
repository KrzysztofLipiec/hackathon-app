import { AbstractPrompt } from './abstract.prompt';

export class SentimentAnalysisPrompt extends AbstractPrompt {
    public generatePrompt(data: { review: string, updates: string[] }) {
        return `On a scale of 1 to 5, 1 being unhappy and 5 being very happy,
    what would be the hapiness of the customer based on their written review and Updates? Updates are a discussion between interested parties, connected to the task.
    Updates are sorted from the eldest to the newest, please consider the whole discussion and figure out if the problem has been solved.
    I also want to know what is the main reason for the score and what would be the recommended action we should take to fix the user's problems.
    I want the score, the reason and the recommended actions to be separated with a '-'.
    
    Review: The product helped me a lot, and solved all of my problems! Thanks!
    Updates: no updates
    Result: 5 - The user's needs were satisfied completely - Continue with the good work. Have a cookie.
    
    Review: It's a very good product. It's missing a few functionalities, but we can use it.
    Updates: 
        - could you tell us what is missing?
        - yes sure, we would need to add suffix at the end of the each users name.
        - thanks for your update, we will deliver it soon.
    Result: 4 - The user is satisfied with the product, but feels it might have more features. - Plan a task to implement the functionality to add suffixes to the user names.
    
    Review: It was ok, I guess. Didn't know how to do some of the stuff.
    Updates: 
        - which areas of the application was missing for you.
        - could you help us understand what was not clear for you?
        - I don't know how to change settings. I don't understand how to calculate the additional data.
        - To change settings you need to click cog icon in the top right corner of the app window. You can find the additional data calculating options at the bottom of the main screen.
        - found it thank you, but it was not easy to find.
    Result: 3 - The user did not understand how to use the product, so their experience could not exactly be classified as positive, but we were able to slightly guide them to move forward. - Plan UX improvements to the UI and a tutorial for new users.
    
    Review: It worked for some time and then crashed. Haven't been able to use it since then.
    Update: 
        - We were able to see logs of this incident but we don't see any issue
        - It just stopped
        - Please message us if it will happen again
    Result: 2 - While having a good start with the app, after breaking the user could not use it anymore but the problem is not resolved. - Prioritise this bug, investigate and fix it ASAP.
    
    Review: It doesn't work at all for me.
    Update: 
        - no updates
    Result: 1 - The user did not get any expected results from the product and there was no discussion on how to fix it. - We should contact the user ASAP to get more information on this problem and create a high priority bug on our board.
    
    Review: ${data.review}
    Updates: 
        ${data.updates?.length ? data.updates.map((update) => `- ${update}\n`) : '- no updates'}
    Result:`
    }
}
