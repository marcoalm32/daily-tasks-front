import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaginationModel } from '../models/pagination.model';
import { ResponseApi } from '../models/response-api';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServiceModel } from '../models/service.model';
import { QueryParamsDto } from '../models/dto/query-params.dto';

@Component({
    template: 'list'
})

export abstract class AbstractListComponent<T> implements OnInit, OnDestroy {
  protected items: T[] = [];
  subscriptions: Subscription[] = [];
  pagination: PaginationModel = {
    page: 1,
    pageSize: 9,
    totalItems: 0,
    totalPages: 0,
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

  protected getItems(search: string = ''): void {
    const params: QueryParamsDto = new QueryParamsDto(
      this.pagination.page,
      this.pagination.pageSize,
      search
    );
    const subscription = this.service.get(params).subscribe({
        next: (response: ResponseApi<T[]>) => {
            this.items = response.data as any;
            this.pagination = response.pagination as PaginationModel;
            this.getItemsValue();
        },
        error: (error: any) => {
            console.log(error)
        }
    })
    this.subscriptions.push(subscription);
  }

  protected getItemsValue() {}

  protected navigateTo(path: string) {
    this.router.navigate([path]).then();
  }
}
