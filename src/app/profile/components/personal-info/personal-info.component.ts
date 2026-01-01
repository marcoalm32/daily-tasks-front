import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractFormComponent } from '../../../shared/abstract/abstract-form.component';
import { PersonalInfoModel } from '../../models/personal-info.model';
import { delay, Observable, tap } from 'rxjs';
import { ResponseApi } from '../../../shared/models/response-api';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from '../../../shared/services/toaster.service';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../../auth/service/auth.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss'
})
export class PersonalInfoComponent extends AbstractFormComponent<PersonalInfoModel> implements OnChanges {
  
  @Input() user: PersonalInfoModel | null = null;

  constructor(
    protected override readonly fb: FormBuilder,
    protected override readonly route: ActivatedRoute,
    protected override readonly router: Router,
    protected override readonly toasterService: ToasterService,
    protected readonly profileService: ProfileService,
    private readonly authService: AuthService,
  ) {
    super(fb, route, router, toasterService, profileService);
  }

  protected override createForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  override ngOnInit(): void {
    this.createForm();
    this.getFormId();
    this.form.disable();
  }

  protected override getById(id: string): Observable<ResponseApi<PersonalInfoModel>> {
    return this.profileService.getById(id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      this.form.patchValue({
        name: this.user.name,
        phone: this.user.phone,
        email: this.user.email,
      });
    }
    if (this.user) {
      this.id = this.user._id || null;
      this.editMode = !!this.id;
    }
  }

  onEdit(): void {
    this.form.enable();
  }

  protected override update(): void {
    if (this.form.invalid) {
          this.form.markAllAsTouched();
          this.form.markAsDirty();
          return;
        }
        const subscription = this.profileService.update(this.id as string, this.form.value)
        .pipe(
          tap((response) => {
            return this.toasterService.show(response.message, 'success');
          }),
          delay(2000)
        )
        .subscribe({
          next: (_: ResponseApi<PersonalInfoModel>) => {
            this.authService.logout();
          },
          error: (error) => {
            this.toasterService.show(error?.error?.message, 'error');
          }
        });
        this.subscriptions.push(subscription);
  }

  protected override cancel(): void {
    this.form.disable();
  }

}
