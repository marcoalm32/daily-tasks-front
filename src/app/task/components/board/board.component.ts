import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { TaskModel } from '../../model/task.model';
import { AbstractListComponent } from '../../../shared/abstract/abstract-list.component';
import { ModalService } from '../../../shared/services/modal.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent extends AbstractListComponent<TaskModel>{
  protected override service: any;
 
  steppers = [
    { label: 'A Fazer', color: 'var(--blue-lighter)', icon: 'playlist_add' },
    { label: 'Em Andamento', color: 'var(--blue-dark)', icon: 'autorenew' },
    { label: 'Concluído', color: '#cfcacaff', icon: 'check_circle' },
  ];
  boardList: Map<string, TaskModel[]> = new Map<string, TaskModel[]>();
  constructor(
    protected override readonly router: Router,
    protected override readonly modalService: ModalService,
    protected readonly taskService: TaskService,
  ) {
    super(router, modalService, taskService);
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

  drop(event: any, status: string) {
    console.log(event, status);
    
  }

}
