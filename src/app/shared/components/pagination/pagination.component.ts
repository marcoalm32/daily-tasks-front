import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { PaginationModel } from '../../models/pagination.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule,
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  @Input() pagination: PaginationModel = {
    limit: 10,
    page: 1,
    totalItems: 0,
    totalPages: 0
  }
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  get pages(): number[] {
    const total = this.pagination.totalPages;
    const current = this.pagination.page;
    if (total <= 1) {
      return [1];
    }
    if (current === 1) {
      return [1, 2];
    }
    if (current === total) {
      return [total - 1, total];
    }
    return [current, current + 1];
  }
}
