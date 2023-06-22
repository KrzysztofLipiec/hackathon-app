import { AbstractPrompt } from './abstract.prompt';

export class AssessmentPrompt extends AbstractPrompt {
    public generatePrompt({ user, data }: { user: string, data: any }): string {
        return `
        Write an assessment review for our employee 
        ${user} based on the following data of issues solved by the employee. The data in JSON format is: ${JSON.stringify(data)}. 
        Please let me know how the employee is doing and if the employee is solving user's problems.`
    }
}
