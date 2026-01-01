import { Component, Directive, Inject, InjectionToken, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, of, Subscription, switchMap } from "rxjs";
import { ResponseApi } from "../models/response-api";
import { ToasterService } from "../services/toaster.service";
import { ServiceModel } from "../models/service.model";
import { MESSAGES } from "../messages/messages";

const SERVICE_MODEL = new InjectionToken<ServiceModel<any>>('SERVICE_MODEL');
@Directive()
export abstract class AbstractFormComponent<T> implements OnInit, OnDestroy {


    protected subscriptions: Subscription[] = [];
    protected data: T | T[] | null = null;
    protected id: string | null = null;
    protected form: FormGroup = new FormGroup({});
    protected editMode: boolean = false;
    protected messages = MESSAGES;
    protected loading: boolean = false;

    constructor(
        protected readonly fb: FormBuilder,
        protected readonly route: ActivatedRoute,
        protected readonly router: Router,
        protected readonly toasterService: ToasterService,
        @Inject(SERVICE_MODEL) protected readonly service: ServiceModel<T>,
    ) {}

    ngOnInit(): void {
        this.createForm();
        this.getFormId();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    protected abstract createForm(): void;
    protected abstract getById(id: string): Observable<ResponseApi<T>>;

    protected getFormId(): void {
        const subscription = this.route.paramMap.pipe(
            switchMap(params => {
                this.id = params.get('id');
                this.editMode = !!this.id;
                if (this.id) {
                    return this.getById(this.id);
                }
                return of(null);
            })
        ).subscribe({
            next: (response) => {
                this.data = response?.data || null;
                this.form.patchValue(response?.data || {});
            },
            error: (err) => {
                this.toasterService.show(err.error.message, 'error');
            }
        });
        this.subscriptions.push(subscription);
    }

    protected save(): void {
        if (this.editMode) {
            this.update();
        } else {
            this.create();
        }
    }

    protected create() {
        if (!this.service) return;
        if (!this.checkFormisValid()) return;
        const payload = this.form.value;
        const subscription = this.service.create(payload).subscribe({
            next: (response) => {
                this.toasterService.show(response.message, 'success');
                this.router.navigate(['../'], { relativeTo: this.route });
            },
            error: (err) => {
                this.toasterService.show(err.error.message, 'error');
            }
        });
        this.subscriptions.push(subscription);
    }

    protected checkFormisValid(): boolean {
        if (!this.form.invalid) {
            this.form.markAllAsTouched();
            this.form.markAsDirty();
            return false;
        }
        return true;
    }

    protected update() {
        if (!this.service || !this.id) return;
        if (!this.checkFormisValid()) return;
        const payload = this.form.value;
        const subscription = this.service.update(this.id, payload).subscribe({
            next: (response) => {
                this.toasterService.show(response.message, 'success');
                this.router.navigate(['../'], { relativeTo: this.route });
            },
            error: (err) => {
                this.toasterService.show(err.error.message, 'error');
            }
        });
        this.subscriptions.push(subscription);
    }

    protected cancel(): void {
        this.form.reset();
        this.form.markAsUntouched();
        this.form.markAsPristine();
        this.router.navigate(['../'], { relativeTo: this.route });
    }

}