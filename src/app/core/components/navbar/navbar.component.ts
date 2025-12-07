import { Component } from '@angular/core';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogService } from '../../../shared/services/dialog.service';
import { Dialog } from '../../../shared/models/dialog';
import { MenuComponent } from '../../../shared/components/menu/menu.component';
import { AuthService } from '../../../auth/service/auth.service';
import { UserModel } from '../../../auth/models/user.model';

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

  constructor(
    private dialogService: DialogService,
    private readonly authService: AuthService,
  ) {}


  createTask(): void {
    this.dialogService.openDialogSignal.set({
      data: {},
      dialog: new Dialog('Criar Tarefa', 'criar')
    });
  }

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
