import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseApi } from '../models/response-api';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ServiceModel } from '../models/service.model';
import { QueryParamsDto } from '../models/dto/query-params.dto';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractService<T> implements ServiceModel<T> {
  constructor(
    protected readonly endpoint: string,
    protected readonly http: HttpClient,
  ){}

  get(params: QueryParamsDto): Observable<ResponseApi<T[]>> {
    const httpParams = new HttpParams();
    httpParams.set('page', params.page);
    httpParams.set('limit', params.limit);
    httpParams.set('search', params.search);
    return this.http.get<ResponseApi<T[]>>(this.endpoint, {params: httpParams});
  }

  getById(id: string): Observable<ResponseApi<T>> {
    const url = `${this.endpoint}/${id}`;
    return this.http.get<ResponseApi<T>>(url);
  }

  create(item: T): Observable<ResponseApi<T>> {
     return this.http.post<ResponseApi<T>>(this.endpoint, item);
  }
  
  update(id: string, item: T): Observable<ResponseApi<T>> {
    const url = `${this.endpoint}/${id}`;
    return this.http.patch<ResponseApi<T>>(url, item);
  }

  delete(id: string): Observable<ResponseApi<boolean>> {
    const url = `${this.endpoint}/${id}`;
    return this.http.delete<ResponseApi<boolean>>(url);
  }

  
}
