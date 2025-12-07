import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ButtonColor, ButtonVariant } from '../../models/button.model';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() color: ButtonColor = 'success';
  @Input() disabled: boolean = false;
  @Input() size: 'small' | 'medium' | 'large' | 'extra-large'  = 'medium';
  @Input() variant: ButtonVariant = 'raised';
  @Input() iconSize: 'icon-sm' | 'icon-md' | 'icon-lg' | 'icon-xl' = 'icon-md';
  @Input() iconColor: 'icon-default' | 'icon-primary' | 'icon-warning' = 'icon-default';

  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

}
