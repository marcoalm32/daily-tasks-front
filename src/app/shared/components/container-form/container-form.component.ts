import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-container-form',
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
  ],
  templateUrl: './container-form.component.html',
  styleUrl: './container-form.component.scss'
})
export class ContainerFormComponent {
  
  @Input() title: string = '';
  @Input() width: string = '400px';
  @Input() minHeight: string = '350px';
  @Input() logo: boolean = true;
  @Input() headerBgColor: 'primary' | 'link' | 'none' = 'primary';
}
