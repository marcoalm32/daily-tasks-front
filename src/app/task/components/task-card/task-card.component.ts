import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskModel } from '../../model/task.model';
import { Task } from 'zone.js/lib/zone-impl';


@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {

  @Input() task: TaskModel | null = null;
  @Input() alert: boolean = false;
  @Input() format: 'list' | 'grid' = 'grid';

  @Output() edit: EventEmitter<string | null> = new EventEmitter<string | null>();
  @Output() delete: EventEmitter<Task | null> = new EventEmitter<Task | null>();
}
