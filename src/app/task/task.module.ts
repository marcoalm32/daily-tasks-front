import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TasksComponent } from './components/tasks/tasks.component';
import { BoardComponent } from './components/board/board.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { TagComponent } from '../shared/components/tag/tag.component';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    TasksComponent,
    BoardComponent,
    TaskCardComponent,
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    TagComponent,
    MatTooltipModule,
  ]
})
export class TaskModule { }
