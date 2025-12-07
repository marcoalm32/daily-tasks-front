import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
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
  @Input() width: number = 400;
  @Input() minHeight: number = 350;
}
