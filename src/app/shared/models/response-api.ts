import { PaginationModel } from "./pagination.model";

export interface ResponseApi<T> {
    data: T;
    message: string;
    status: number;
    pagination?: PaginationModel;
}