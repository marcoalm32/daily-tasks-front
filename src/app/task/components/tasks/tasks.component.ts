import { Component, TemplateRef } from '@angular/core';
import { AbstractListComponent } from '../../../shared/abstract/abstract-list.component';
import { TaskModel } from '../../model/task.model';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { ServiceModel } from '../../../shared/models/service.model';
import { ModalService } from '../../../shared/services/modal.service';
import { ToasterService } from '../../../shared/services/toaster.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent extends AbstractListComponent<TaskModel> {
  protected override service: ServiceModel<TaskModel>
  columns = [
    { label: 'Tarefa', col: 'col-4'},
    { label: 'Vencimento', col: 'col-2'},
    { label: 'Prioridade', col: 'col-2'},
    { label: 'Ações', col: 'col-3'}
  ];
  constructor(
    protected override readonly router: Router,
    protected override readonly modalService: ModalService,
    protected override readonly toasterService: ToasterService,
    protected readonly taskService: TaskService
  ) { 
    super(router, modalService, toasterService, taskService);
    this.service = taskService;
  }
}
