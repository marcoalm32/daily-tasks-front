import { Component, Inject, TemplateRef } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MESSAGES } from '../../messages/messages';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    ButtonComponent,
    MatDialogModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  messages = MESSAGES;
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data: { 
      title: string; 
      message: string; 
      contentTemplate?: TemplateRef<any>; 
    }
  ) { }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
