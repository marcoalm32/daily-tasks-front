import { Component, effect } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogService } from '../../../shared/services/dialog.service';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    NavbarComponent,
    SidebarComponent,
    RouterModule,
    MatDialogModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  constructor(
    private dialogService: DialogService,
    private matDialog: MatDialog,
  ) {

    
    effect(() => {
      const value = this.dialogService.openDialogSignal();
      if (value) {
        this.matDialog.open(DialogComponent, { data: value });
        this.dialogService.dialogOpened();
      }
    });
  }
}
