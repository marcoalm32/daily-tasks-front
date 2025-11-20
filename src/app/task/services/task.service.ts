import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ResponseApi } from '../../shared/models/response-api';
import { TaskModel } from '../model/task.model';
import { AbstractService } from '../../shared/abstract/abstract.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends AbstractService<TaskModel> {
  

  constructor() {
    super();
   }

  get(): Observable<ResponseApi<TaskModel[]>> {
    const endpoint = this.endpoint + '/tasks-board';
    const mockTasks: TaskModel[] = [
      {
        _id: '632676473643',
        category: 'Estudo',
        status: 'pending',
        dueDate: new Date(),
        description: 'Estudar Angular',
        title: 'Angular',
        priority: 'medium',
      },
      {
        _id: '181938924nkdjfjef',
        category: 'Fitness',
        status: 'pending',
        dueDate: new Date(),
        description: 'Voltar para a academia',
        title: 'Musculação',
        priority: 'high',
      },
      {
        _id: '29384902384ndjef',
        category: 'Lazer',
        status: 'pending',
        dueDate: new Date(),
        description: 'Assistir filme no fim de semana',
        title: 'Filme',
        priority: 'low',
      },
      {
        _id: '29384902384ndjef',
        category: 'Lazer',
        status: 'in-progress',
        dueDate: new Date(),
        description: 'Assistir série no fim de semana',
        title: 'Série',
        priority: 'low',
      },
      {
        _id: '29384902384ndjef',
        category: 'Contas',
        status: 'in-progress',
        dueDate: new Date(),
        description: 'Pagar a conta de luz referente ao mês de outubro',
        title: 'Conta de Luz',
        priority: 'high',
        isExpired: true,

      }
    ]
    return of({
      data: mockTasks,
      message: 'Tasks fetched successfully',
      status: 200,
    })
  }

  override getById(id: string): Observable<ResponseApi<TaskModel>> {
    throw new Error('Method not implemented.');
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
