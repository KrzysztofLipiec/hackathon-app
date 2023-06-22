import { AbstractPrompt } from './abstract.prompt';
import { AssessmentItem } from '../dto/AssessmentItem';
import { MondayDocItemType } from '../dto/MondayDocItemType';

export class AssessmentPrompt extends AbstractPrompt {
    private getReviewLine(item: AssessmentItem) {
        return 'review: ' + item.columns.find(col => col.type === MondayDocItemType.REVIEW).value;
    }

    public generatePrompt({ user, items }: { user: string, items: AssessmentItem[] }): string {
        const assessment = items.map((item) => {
            let result = this.getReviewLine(item) + '\n';

            if (item.updates.length > 0) {
                result += 'conversation:\n';
                result += item.updates.map(update => `- ${update.creatorName} wrote: ${update.textBody}`).join('\n') + '\n';
            }

            return result;
        });
        return `
        Write an assessment review for our employee 
        ${user} based on the following data of issues solved by the employee. Here are the reviews from the clients and conversations:
        ${assessment.join('\n')}
        Please let me know how the employee is doing and if the employee is solving user's problems. Please give me a list of strengths and areas to improve and finish it off with a short summary.
        At the beginning please give me the information such as name of employee and today's date.
        Please give me the assessment in markdown format.
                
        Example assessment:
        ### Employee Information
        
        Name: John Smith
        Evaluation Date: 22.06.2023
        
        ### Strengths:
        1. Technical Expertise: John demonstrates exceptional technical knowledge and expertise in resolving customer issues. He consistently stays updated with the latest product information and troubleshooting techniques, allowing him to provide accurate and efficient solutions to customers.
        2. Customer Service Skills: John possesses excellent customer service skills. He is patient, empathetic, and maintains a professional and friendly demeanor while interacting with customers. He actively listens to their concerns, addresses them promptly, and ensures a positive customer experience.
        3. Communication: John communicates effectively both verbally and in writing. He explains technical concepts in a clear and concise manner, making it easier for customers to understand complex issues. He also writes comprehensive and well-structured email responses, ensuring customers receive accurate and helpful information.
        
        ### Areas to Improve:
        1. Time Management: John occasionally faces challenges in managing his time effectively, especially during peak support hours. He could benefit from improving his prioritization skills and finding ways to handle multiple tasks simultaneously without compromising the quality of his work.
        2. Proactive Problem Solving: While John excels at resolving customer issues, there is room for improvement in his proactive problem-solving skills. Encouraging him to anticipate potential problems and provide preemptive solutions would enhance his ability to address customer concerns more efficiently.
        3. Product Knowledge Expansion: Although John has a strong technical foundation, he could broaden his product knowledge further. Encouraging him to participate in training sessions, workshops, and self-study opportunities would enhance his expertise and allow him to handle a wider range of customer inquiries effectively.
        
        ### Summary
        Overall, John is an asset to the support desk team. His technical expertise, customer service skills, and effective communication contribute significantly to customer satisfaction. By focusing on time management, proactive problem solving, and expanding his product knowledge, John can continue to improve his performance and excel in his role as a support desk agent.`;
    }
}
