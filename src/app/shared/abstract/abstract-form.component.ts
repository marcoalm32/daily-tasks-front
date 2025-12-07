import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, of, Subscription, switchMap } from "rxjs";
import { ResponseApi } from "../models/response-api";

@Component({
    template: ''
})
export abstract class AbstractFormComponent<T> implements OnInit, OnDestroy {

    protected subscriptions: Subscription[] = [];
    protected data: T | T[] | null = null;
    protected id: string | null = null;
    protected form: FormGroup = new FormGroup({});
    protected editMode: boolean = false;

    constructor(
        protected readonly fb: FormBuilder,
        protected readonly route: ActivatedRoute,
        protected readonly router: Router,
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
                console.error('Error fetching data by ID:', err);
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

    public getErrorMessage(field: string): string {
        const control = this.form.get(field);
        if (!control) return '';
        
        const errorKeys = Object.keys(control.errors || {});
        if (errorKeys.length === 0) return '';
        
        const firstError = errorKeys[0];
        
        switch (firstError) {
            case 'required':
                return `${this.humanize(field)} é obrigatório.`;
            case 'email':
                return 'Email inválido.';
            case 'passwordStrength':
                return 'A senha deve conter pelo menos 8 caracteres e incluir letras.';
            case 'minlength':
                const minLength = control.errors?.['minlength']?.requiredLength;
                return `${this.humanize(field)} deve ter pelo menos ${minLength} caracteres.`;
            case 'maxlength':
                const maxLength = control.errors?.['maxlength']?.requiredLength;
                return `${this.humanize(field)} deve ter no máximo ${maxLength} caracteres.`;
            case 'pattern':
                return `${this.humanize(field)} possui formato inválido.`;
            case 'min':
                const minValue = control.errors?.['min']?.min;
                return `${this.humanize(field)} deve ser maior ou igual a ${minValue}.`;
            case 'max':
                const maxValue = control.errors?.['max']?.max;
                return `${this.humanize(field)} deve ser menor ou igual a ${maxValue}.`;
            default:
                return `${this.humanize(field)} é inválido.`;
        }
    }

    protected humanize(field: string): string {
        return field
            .replace(/([A-Z])/g, ' $1')
            .replace(/[_\-]/g, ' ')
            .replace(/^./, s => s.toUpperCase());
    }

}