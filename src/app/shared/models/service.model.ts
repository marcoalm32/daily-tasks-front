import { Observable } from "rxjs";
import { PaginationModel } from "./pagination.model";
import { ResponseApi } from "./response-api";

export interface ServiceModel<T> {
    get(pagination?: PaginationModel): Observable<ResponseApi<T[]>>;
    getById(id: string): Observable<ResponseApi<T>>;
    create(item: T): Observable<ResponseApi<T>>;
    update(id: string, item: T): Observable<ResponseApi<T>>;
    delete(id: string): Observable<ResponseApi<null>>;
}