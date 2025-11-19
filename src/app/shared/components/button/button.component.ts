import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

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
  @Input() color: 'success' | 'accent' | 'warning' | 'danger' = 'success';
  @Input() disabled: boolean = false;
  @Input() size: 'small' | 'medium' | 'large' | 'extra-large'  = 'medium';

}
