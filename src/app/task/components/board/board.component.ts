import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Subscription } from 'rxjs';
import { TaskModel } from '../../model/task.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy{

  steppers = [
    { label: 'A Fazer', color: 'var(--blue-navy)', icon: 'playlist_add' },
    { label: 'Em Andamento', color: 'var(--blue-dark)', icon: 'autorenew' },
    { label: 'Concluído', color: '#cfcacaff', icon: 'check_circle' },
  ];
  tasks: TaskModel[] = [];
  subscriptions: Subscription[] = [];
  boardList: Map<string, TaskModel[]> = new Map<string, TaskModel[]>();
  constructor(
    private readonly router: Router,
    private readonly taskService: TaskService,
  ) {

  }

  ngOnInit(): void {
    this.getTasks();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  setArrayBoards() {
    this.boardList.set('A Fazer', []);
    this.boardList.set('Em Andamento', []);
    this.boardList.set('Concluído', []);

    this.tasks.forEach(task => {
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

  getTasks(): void {
    const sub = this.taskService.get().subscribe({
      next: (response) => {
        this.tasks = response.data;
        this.setArrayBoards();
      },
      error: (error) => {
        console.error('BoardComponent.getTasks.error', error);
      }
    });
    this.subscriptions.push(sub);
  }

}
