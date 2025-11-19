import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();

  constructor() { }

  setLoading(isLoasding: boolean) {
    this.loading.next(isLoasding);
  }
}