import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaginationModel } from '../models/pagination.model';
import { ResponseApi } from '../models/response-api';
import { Component, Inject, InjectionToken, OnDestroy, OnInit } from '@angular/core';
import { ServiceModel } from '../models/service.model';
import { QueryParamsDto } from '../models/dto/query-params.dto';
import { ModalService } from '../services/modal.service';

const SERVICE_MODEL = new InjectionToken<ServiceModel<any>>('SERVICE_MODEL');
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
    protected readonly modalService: ModalService,
    @Inject(SERVICE_MODEL) protected readonly service: ServiceModel<T>,
  ) {}


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

  protected onEdit(id: any) {
    this.navigateTo(`${this.router.url}/edit/${id}`);
  }

  protected onDelete(item: T) {
    this.modalService.confirm(
      'Deletar',
      `Tem certeza que deseja excluir ${(item as any).title}?`
    );
  }
}
