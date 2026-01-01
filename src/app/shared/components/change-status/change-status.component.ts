import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MESSAGES } from '../../messages/messages';
import { CommonModule } from '@angular/common';
import { StatusDetail } from '../../../task/model/status-detail.model';
import { MatRadioModule } from '@angular/material/radio';
import { StatusType } from '../../../task/model/task.model';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-change-status',
  standalone: true,
  imports: [
    CommonModule,
    MatRadioModule,
    FormsModule,
    ButtonComponent,
  ],
  templateUrl: './change-status.component.html',
  styleUrl: './change-status.component.scss'
})
export class ChangeStatusComponent {

  messages = MESSAGES;
  @Input() status: StatusDetail[] = [];
  @Input() selectedStatus: StatusType = 'Pending';
  @Output() selectedStatusChange: EventEmitter<StatusType> = new EventEmitter<StatusType>();
  constructor() { }

  changeStatus(event: any) {
    const newStatus = event.value as StatusType;
    this.selectedStatus = newStatus;
  }

  get widthBar(): number {
    const status = {
      'Pending': 33,
      'In Progress': 66,
      'Completed': 100
    };
    return status[this.selectedStatus]
  }

  get colorBar(): string {
    const status = {
      'Pending': 'var(--blue-lighter)',
      'In Progress': 'var(--blue-dark)',
      'Completed': '#cfcacaff'
    };
    return status[this.selectedStatus]
  }
  
}
