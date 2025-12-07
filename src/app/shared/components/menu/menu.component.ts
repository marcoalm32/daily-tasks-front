import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserModel } from '../../../auth/models/user.model';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule, 
    MatMenuModule, 
    MatIconModule, 
    MatButtonModule, 
    MatDividerModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Input() user: UserModel | null = null;
  @Input() isAuthenticated = false;
  @Output() logout: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    private readonly router: Router,
  ) {}

  onNavigate(route: string): void {
    this.router.navigate([route]).then();
  }
}
