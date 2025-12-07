import { PaginationModel } from "./pagination.model";

export interface ResponseApi<T> {
    data: T | T[];
    message: string;
    status: number;
    pagination?: PaginationModel;
}

export interface ResponseBody<T> {
    data: T;
    message: string;
    status: number;
}