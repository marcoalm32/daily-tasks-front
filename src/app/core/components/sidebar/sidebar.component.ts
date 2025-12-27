import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouteModel } from '../../../shared/models/route.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  routes: RouteModel[] = [
    { path: '/profile', label: 'Meu Perfil', icon: 'home' },
    { path: '/tasks', label: 'Lista de tarefas', icon: 'task' },
    { path: '/tasks/board', label: 'Board', icon: 'analytics' },
    { path: '/tasks/new', label: 'Nova Tarefa', icon: 'add_circle' },
  ];
}
