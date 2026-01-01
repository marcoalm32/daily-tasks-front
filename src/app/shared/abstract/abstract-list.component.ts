import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaginationModel } from '../models/pagination.model';
import { ResponseApi } from '../models/response-api';
import { 
  Directive, 
  Inject, 
  InjectionToken, 
  OnDestroy, 
  OnInit, 
  TemplateRef, 
  ViewChild } from '@angular/core';
import { ServiceModel } from '../models/service.model';
import { QueryParamsDto } from '../models/dto/query-params.dto';
import { ModalService } from '../services/modal.service';
import { MESSAGES } from '../messages/messages';

const SERVICE_MODEL = new InjectionToken<ServiceModel<any>>('SERVICE_MODEL');
@Directive()

export abstract class AbstractListComponent<T> implements OnInit, OnDestroy {
  protected items: T[] = [];
  subscriptions: Subscription[] = [];
  pagination: PaginationModel = {
    page: 1,
    limit: 9,
    totalItems: 0,
    totalPages: 0,
  }
  messages = MESSAGES;
  @ViewChild('confirmActions') actionsTemplate!: TemplateRef<any>;
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
      this.pagination.limit,
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

  protected update(id: string, data: Partial<T>) {
    const subscription = this.service.update(id, data).subscribe({
      next: (_: ResponseApi<T>) => {
        this.getItems();
      },
      error: (error: any) => {
        console.log(error)
      }
    });
    this.subscriptions.push(subscription);
  }

  protected openModal(item: T) {
    this.modalService
      .confirm(
        this.messages.title.confirmation,
        this.messages.notifications.confirm_update_status,
        this.actionsTemplate
      ).subscribe((result: boolean) => {
        if (result) {
          this.onDelete(item);
        }
      });
  }

  protected onDelete(item: T) {
    const subscription = this.service.delete((item as any)._id).subscribe({
      next: (_: ResponseApi<null>) => {
        this.getItems();
      },
      error: (error: any) => {
        console.log(error)
      }
    });
    this.subscriptions.push(subscription);
  }

}
