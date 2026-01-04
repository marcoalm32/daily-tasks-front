import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../button/button.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-accordion',
  standalone: true,
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({ height: 0, opacity: 0, overflow: 'hidden' }),
        animate('250ms ease-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1, overflow: 'hidden' }),
        animate('250ms ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ])
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ButtonComponent,
  ],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss'
})
export class AccordionComponent<T> {

  @Input() value: T[] = [];
  @Input() limit: number = 4;

  @ContentChild('accordionItem', {static: true})
  template!: TemplateRef<any>;
  expanded: boolean = false;

  toggle() {
    this.expanded = !this.expanded;
  }

  get visibleItems(): T[] {
    return this.expanded ? this.value : this.value.slice(0, this.limit);
  }

  get showToggle(): boolean {
    return this.value.length > this.limit;
  }

}
