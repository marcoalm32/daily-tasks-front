import { DefaultModel } from "../../shared/models/default.model";

export type PriorityType = 'low' | 'medium' | 'high';

export type StatusType = 'pending' | 'in-progress' | 'completed';

export interface TaskModel extends DefaultModel {
    title: string;
    description: string;
    dueDate: Date;
    priority: PriorityType;
    category: string;
    status: StatusType;
    isExpired?: boolean;
}