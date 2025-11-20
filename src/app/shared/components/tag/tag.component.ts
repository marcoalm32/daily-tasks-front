import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss'
})
export class TagComponent {

  @Input() value: string = '';
  @Input() priority: 'low' | 'medium' | 'high' = 'low';

  get color(): string {
    const colors: { [key: string]: string } = {
      low: 'var(--status-info)',
      medium: 'var(--status-warning)',
      high: 'var(--status-danger)',
    };
    return colors[this.priority] || colors['low'];
  }
}
