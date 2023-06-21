import { AbstractPrompt } from './abstract.prompt';

export class AssessmentPrompt extends AbstractPrompt {
    public generatePrompt({ user, data }: { user: string, data: any }): string {
        return `
        Write an assessment review for our employee 
        ${user} based on the following data of solved issues by him in json: ${JSON.stringify(data)}. 
        Please try to say how he is going and if he is solving users problem,
        there is special column id m_hckthn_wwwratngg which is describing customer happiness for this item. I will use it in docx file so please format it correctly
        `
    }
}
