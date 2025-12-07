import { Component, Input } from '@angular/core';
import { PriorityType } from '../../../task/model/task.model';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss'
})
export class TagComponent {

  @Input() value: string = '';
  @Input() priority: PriorityType = 'Low';

  get color(): string {
    const colors: { [key: string]: string } = {
      Low: 'var(--status-info)',
      Medium: 'var(--status-warning)',
      High: 'var(--status-danger)',
    };
    return colors[this.priority] || colors['Low'];
  }
}
