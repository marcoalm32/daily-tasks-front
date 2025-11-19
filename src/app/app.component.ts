import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingService } from './shared/services/loading.service';
import { LoadingComponent } from './shared/components/loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoadingComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private readonly loadingService: LoadingService,
    private readonly cdRef: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.loadingService.loading$.subscribe((isLoading) => {
        this.loading = isLoading;
        this.cdRef.detectChanges();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
