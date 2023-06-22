import { MondayDocItemType } from './MondayDocItemType';

export interface AssessmentItem {
    id: string;
    updates: {
        id: string;
        textBody: string;
        creatorName: string;
    }[];
    columns: {
        id: string;
        value: string;
        type: MondayDocItemType;
    }[];
}
