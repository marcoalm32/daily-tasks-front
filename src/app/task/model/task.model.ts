import { DefaultModel } from "../../shared/models/default.model";

export type PriorityType = 'Low' | 'Medium' | 'High';

export type StatusType = 'Pending' | 'In Progress' | 'Completed';

export interface TaskModel extends DefaultModel {
    title: string;
    description: string;
    dueDate: Date;
    priority: PriorityType;
    category: string;
    status: StatusType;
    isExpired?: boolean;
}