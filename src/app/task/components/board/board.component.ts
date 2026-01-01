import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { StatusType, TaskModel } from '../../model/task.model';
import { AbstractListComponent } from '../../../shared/abstract/abstract-list.component';
import { ModalService } from '../../../shared/services/modal.service';
import { StatusDetail } from '../../model/status-detail.model';
import { ToasterService } from '../../../shared/services/toaster.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent extends AbstractListComponent<TaskModel>{
  protected override service: any;
  selectedTask: TaskModel | null = null;
  steppers: StatusDetail[] = [
    { label: 'A Fazer', color: 'var(--blue-lighter)', icon: 'playlist_add', value: 'Pending' },
    { label: 'Em Andamento', color: 'var(--blue-dark)', icon: 'autorenew', value: 'In Progress' },
    { label: 'Concluído', color: '#cfcacaff', icon: 'check_circle', value: 'Completed' },
  ];
  boardList: Map<string, TaskModel[]> = new Map<string, TaskModel[]>();
  constructor(
    protected override readonly router: Router,
    protected override readonly modalService: ModalService,
    protected override readonly toasterService: ToasterService,
    protected readonly taskService: TaskService,
  ) {
    super(router, modalService, toasterService, taskService);
    this.service = this.taskService;
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override getItemsValue() {
    super.getItemsValue();
    this.setArrayBoards();
  }

  setArrayBoards() {
    this.boardList.set('A Fazer', []);
    this.boardList.set('Em Andamento', []);
    this.boardList.set('Concluído', []);
    this.items.forEach(task => {
      switch(task.status) {
        case 'Pending':
          this.boardList.get('A Fazer')?.push(task);
          break;
        case 'In Progress':
          this.boardList.get('Em Andamento')?.push(task);
          break;
        case 'Completed':
          this.boardList.get('Concluído')?.push(task);
          break;
        default:
          this.boardList.get('A Fazer')?.push(task);
      }
    });
  }

  updateStatus(task: TaskModel, status: StatusType) {
    this.selectedTask = task;
    this.modalService
      .confirm(
        this.messages.title.confirmation,
        this.messages.notifications.confirm_update_status + ` ${task.title}?`,
        this.actionsTemplate
      ).subscribe((result: any) => {
        console.log(result);
      });
  }

  onStatusChange(newStatus: StatusType, dialogRef: any) {
    if (this.selectedTask && newStatus !== this.selectedTask.status) {
      this.update(this.selectedTask._id, { status: newStatus });
    }
    dialogRef.close();
  }

}
