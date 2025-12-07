import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseApi } from '../../shared/models/response-api';
import { TaskModel } from '../model/task.model';
import { AbstractService } from '../../shared/abstract/abstract.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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

  get(): Observable<ResponseApi<TaskModel[]>> {
    return this.http.get<ResponseApi<TaskModel[]>>(this.endpoint);
  }

  override getById(id: string): Observable<ResponseApi<TaskModel>> {
    return this.http.get<ResponseApi<TaskModel>>(`${this.endpoint}/${id}`);
  }
  override create(item: TaskModel): Observable<ResponseApi<TaskModel>> {
    throw new Error('Method not implemented.');
  }
  override update(id: string, item: TaskModel): Observable<ResponseApi<TaskModel>> {
    throw new Error('Method not implemented.');
  }
  override delete(id: string): Observable<ResponseApi<null>> {
    throw new Error('Method not implemented.');
  }
}
