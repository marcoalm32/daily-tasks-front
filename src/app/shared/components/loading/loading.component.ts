import { Component, OnInit } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Observable } from 'rxjs';
import { LoadingService } from '../../services/loading.service';
import { MESSAGES } from '../../messages/messages';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    MatProgressBarModule
  ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})

export class LoadingComponent implements OnInit {

  loading$: Observable<boolean> = new Observable<boolean>();
  messages = MESSAGES;

  constructor(
    private readonly loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this.loading$ = this.loadingService.loading$;
  }

}
