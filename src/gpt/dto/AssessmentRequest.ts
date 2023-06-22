import { AssessmentItem } from './AssessmentItem';

export interface AssessmentRequest {
    user: {name: string};
    items: AssessmentItem[];
}
