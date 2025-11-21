import { Component, Inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskModel } from '../../model/task.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {

  isEditMode: boolean = false;
  task: TaskModel | null = null;
  form: FormGroup = new FormGroup({});
  constructor(
    private readonly taskService: TaskService,
    public dialogRef: MatDialogRef<TaskFormComponent>,
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { isEditMode: boolean, task: TaskModel | null}
  ) {

    this.isEditMode = data.isEditMode;
    this.task = data.task;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.task ? this.task.title : ''],
      description: [this.task ? this.task.description : ''],
      dueDate: [this.task ? this.task.dueDate : ''],
      priority: [this.task ? this.task.priority : 'medium'],
      category: [this.task ? this.task.category : 'general'],
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
