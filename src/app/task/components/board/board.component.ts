import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Subscription } from 'rxjs';
import { TaskModel } from '../../model/task.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit, OnDestroy{

  steppers = [
    { label: 'A Fazer', color: 'var(--blue-navy)', icon: 'playlist_add' },
    { label: 'Em Andamento', color: 'var(--blue-dark)', icon: 'autorenew' },
    { label: 'Concluído', color: '#cfcacaff', icon: 'check_circle' },
  ];
  tasks: TaskModel[] = [];
  subscriptions: Subscription[] = [];
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

  getTasks(): void {
    const sub = this.taskService.get().subscribe({
      next: (response) => {
        this.tasks = response.data;
      },
      error: (error) => {
        console.error('BoardComponent.getTasks.error', error);
      }
    });
    this.subscriptions.push(sub);
  }

}
