import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ResponseApi } from '../models/response-api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractService<T> {
  
  constructor(
    protected readonly endpoint: string,
    protected readonly http: HttpClient,
  ){}

  abstract get(): Observable<ResponseApi<T[]>>;

  abstract getById(id: string): Observable<ResponseApi<T>>;

  abstract create(item: T): Observable<ResponseApi<T>>;

  abstract update(id: string, item: T): Observable<ResponseApi<T>>;

  abstract delete(id: string): Observable<ResponseApi<null>>;
}
