import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { TaskModel } from '../../model/task.model';
import { AbstractListComponent } from '../../../shared/abstract/abstract-list.component';
import { ServiceModel } from '../../../shared/models/service.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent extends AbstractListComponent<TaskModel>{
  protected override service: ServiceModel<TaskModel>;
  steppers = [
    { label: 'A Fazer', color: 'var(--blue-navy)', icon: 'playlist_add' },
    { label: 'Em Andamento', color: 'var(--blue-dark)', icon: 'autorenew' },
    { label: 'Concluído', color: '#cfcacaff', icon: 'check_circle' },
  ];
  boardList: Map<string, TaskModel[]> = new Map<string, TaskModel[]>();
  constructor(
    protected override readonly router: Router,
    protected readonly taskService: TaskService,
  ) {
    super(router);
    this.service = this.taskService;
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.setArrayBoards();
  }

  setArrayBoards() {
    this.boardList.set('A Fazer', []);
    this.boardList.set('Em Andamento', []);
    this.boardList.set('Concluído', []);

    this.items.forEach(task => {
      switch(task.status) {
        case 'pending':
          this.boardList.get('A Fazer')?.push(task);
          break;
        case 'in-progress':
          this.boardList.get('Em Andamento')?.push(task);
          break;
        case 'completed':
          this.boardList.get('Concluído')?.push(task);
          break;
      }
    });
  }

}
