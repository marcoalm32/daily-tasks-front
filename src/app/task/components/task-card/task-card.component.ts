import { Component, Input } from '@angular/core';
import { TaskModel } from '../../model/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {

  @Input() task: TaskModel | null = null;
  @Input() alert: boolean = false;
}
