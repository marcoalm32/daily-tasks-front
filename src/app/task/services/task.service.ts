import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseApi } from '../../shared/models/response-api';
import { TaskModel } from '../model/task.model';
import { AbstractService } from '../../shared/abstract/abstract.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { QueryParamsDto } from '../../shared/models/dto/query-params.dto';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends AbstractService<TaskModel> {
  

  constructor(
    http: HttpClient,
  ) {
    super(
      environment.apiUrl + '/task',
      http);
   }

  override get(params: QueryParamsDto): Observable<ResponseApi<TaskModel[]>> {
    const httpParams = new HttpParams()
      .set('search', params.search)
      .set('page', params.page.toString())
      .set('limit', params.limit.toString());
    return this.http.get<ResponseApi<TaskModel[]>>(this.endpoint, { params: httpParams });
  }

  override getById(id: string): Observable<ResponseApi<TaskModel>> {
    return this.http.get<ResponseApi<TaskModel>>(`${this.endpoint}/${id}`);
  }
  override create(item: TaskModel): Observable<ResponseApi<TaskModel>> {
    return this.http.post<ResponseApi<TaskModel>>(this.endpoint, item);
  }
  override update(id: string, item: TaskModel): Observable<ResponseApi<TaskModel>> {
    return this.http.patch<ResponseApi<TaskModel>>(`${this.endpoint}/${id}`, item);
  }
  override delete(id: string): Observable<ResponseApi<null>> {
    return this.http.delete<ResponseApi<null>>(`${this.endpoint}/${id}`);
  }
}
