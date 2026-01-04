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
import { ButtonComponent } from '../shared/components/button/button.component';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { FieldComponent } from '../shared/components/field/field.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TaskFormComponent } from './components/task-form/task-form.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ContainerFormComponent } from '../shared/components/container-form/container-form.component';
import { DropdownComponent } from '../shared/components/dropdown/dropdown.component';
import { MatRadioModule } from '@angular/material/radio';
import { PipeModule } from '../shared/pipes/pipe.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ChangeStatusComponent } from '../shared/components/change-status/change-status.component';
import { AccordionComponent } from '../shared/components/accordion/accordion.component';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';


@NgModule({
  declarations: [
    TasksComponent,
    BoardComponent,
    TaskCardComponent,
    TaskFormComponent,
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    TagComponent,
    MatTooltipModule,
    ButtonComponent,
    MatButtonModule,
    MatDialogModule,
    FieldComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ContainerFormComponent,
    DropdownComponent,
    MatRadioModule,
    ButtonComponent,
    PipeModule,
    MatTooltipModule,
    DragDropModule,
    ChangeStatusComponent,
    AccordionComponent,
    PaginationComponent,
  ]
})
export class TaskModule { }
