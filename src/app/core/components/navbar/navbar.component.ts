import { Component } from '@angular/core';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from '../../../shared/components/menu/menu.component';
import { AuthService } from '../../../auth/service/auth.service';
import { UserModel } from '../../../auth/models/user.model';
import { MESSAGES } from '../../../shared/messages/messages';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    LogoComponent,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MenuComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  messages = MESSAGES;
  constructor(
    private readonly authService: AuthService,
  ) {}

  get isAuthenticated(): boolean {
    return this.authService.isLoggedIn();
  }

  get userData(): UserModel | null {
    return this.authService.userData();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
