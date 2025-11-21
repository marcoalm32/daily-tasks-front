import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaginationModel } from '../models/pagination.model';
import { ResponseApi } from '../models/response-api';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServiceModel } from '../models/service.model';

@Component({
    template: 'list'
})

export abstract class AbstractListComponent<T> implements OnInit, OnDestroy {
  protected items: T[] = [];
  subscriptions: Subscription[] = [];
  pagination: PaginationModel = {
    page: 0,
    pageSize: 9,
    totalItems: 0,
    totalPages: 0
  }

  constructor(
    protected readonly router: Router,
  ) {}

  protected abstract service: ServiceModel<T>;

  ngOnInit(): void {
    this.getItems();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  protected getItems() {
    const subscription = this.service.get(this.pagination).subscribe({
        next: (response: ResponseApi<T[]>) => {
            this.items = response.data;
            this.pagination = response.pagination ? response.pagination : this.pagination;
        },
        error: (error: any) => {
            console.log(error)
        }
    })
    this.subscriptions.push(subscription);
  }

  protected navigateTo(path: string) {
    this.router.navigate([path]).then();
  }
}
