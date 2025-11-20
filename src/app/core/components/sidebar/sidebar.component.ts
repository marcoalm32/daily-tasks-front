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
    { path: '/home', label: 'Home', icon: 'home' },
    { path: '/tasks', label: 'Tasks', icon: 'task' },
    { path: '/tasks/board', label: 'Board', icon: 'analytics' }
  ];
}
