import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

export type ToasterType = 'success' | 'error' | 'warning';
export type ToasterIcon = 'check_circle' | 'error' |  'warning';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss'
})
export class ToasterComponent {

  @Input() icon: ToasterIcon = 'check_circle';

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: {
      message: string,
      type: 'success' | 'error' | 'warning',
    }
  ) {
    this.icon = this.getIconByType(data.type);
  }

  private getIconByType(type: 'success' | 'error' | 'warning'): ToasterIcon {
    const icons: {[key in ToasterType]: ToasterIcon} = {
      success: 'check_circle',
      error: 'error',
      warning: 'warning',
    };
    return icons[type] || 'check_circle';
  }
  
}
