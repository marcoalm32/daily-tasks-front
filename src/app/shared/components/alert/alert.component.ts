import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ColorType } from '../../models/color-type.model';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent implements OnChanges {

  icon: string = 'notification_important';
  colorIcon: string = 'var(--warning)';
  @Input() message: string = '';
  @Input() type: ColorType = 'warning';

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type']) {
      this.setIconByType();
    }
  }

  setIconByType(): void {
    switch(this.type) {
      case 'success':
        this.icon = 'check_circle';
        break;
      case 'danger':
        this.icon = 'error';
        break;
      case 'accent':
        this.icon = 'info';
        break;
      case 'warning':
        this.icon = 'warning';
        break;
      default:
        this.icon = 'notification_important';
    }
  }
}
