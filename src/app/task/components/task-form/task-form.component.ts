import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { PriorityType, TaskModel } from '../../model/task.model';
import { FormBuilder, Validators } from '@angular/forms';
import { AbstractFormComponent } from '../../../shared/abstract/abstract-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseApi } from '../../../shared/models/response-api';
import { dateValidator } from '../../../shared/validators/date-validator';
import moment from 'moment';
import { ToasterService } from '../../../shared/services/toaster.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent extends AbstractFormComponent<TaskModel> {

  isEditMode: boolean = false;
  task: TaskModel | null = null;
  categories: Array<{value: PriorityType, label: string}> = [
    {value: 'High', label: 'Alta'},
    {value: 'Medium', label: 'Média'},
    {value: 'Low', label: 'Baixa'},
  ];
  today = moment().format('YYYY-MM-DD');

  constructor(
    protected override readonly fb: FormBuilder,
    protected override readonly route: ActivatedRoute,
    protected override readonly router: Router,
    protected readonly taskService: TaskService,
    protected override readonly toasterService: ToasterService,
  ) {
    super(fb, route, router, toasterService, taskService);
  }


  protected override createForm(): void {
    this.form = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      dueDate: [null, [Validators.required, dateValidator(this.today)]],
      status: ['pending', [Validators.required]],
      priority: [null, [Validators.required]],
      category: [null, [Validators.required]],
    });
  }

  protected override getById(): Observable<ResponseApi<TaskModel>> {
    return this.taskService.getById(this.id!);
  }

  save(): void {
    if (this.editMode) {
      this.update();
    } else {
      this.create();
    }
  }

}
