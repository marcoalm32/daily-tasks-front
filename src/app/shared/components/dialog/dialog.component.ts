import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dialog } from '../../models/dialog';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../services/dialog.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      dialog: Dialog, data: any 
    },
    public dialogService: DialogService,
  ) {

  }

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
