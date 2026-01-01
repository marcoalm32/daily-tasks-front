import { Observable } from "rxjs";
import { QueryParamsDto } from "./dto/query-params.dto";
import { ResponseApi } from "./response-api";

export interface ServiceModel<T> {
    get(params: QueryParamsDto): Observable<ResponseApi<T[]>>;
    getById(id: string): Observable<ResponseApi<T>>;
    create(item: T): Observable<ResponseApi<T>>;
    update(id: string, item: Partial<T>): Observable<ResponseApi<T>>;
    delete(id: string): Observable<ResponseApi<boolean>>;
}