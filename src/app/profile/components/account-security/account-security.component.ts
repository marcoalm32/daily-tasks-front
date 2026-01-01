import { Component, Input } from '@angular/core';
import { AbstractFormComponent } from '../../../shared/abstract/abstract-form.component';
import { PersonalInfoModel } from '../../models/personal-info.model';
import { delay, Observable, tap } from 'rxjs';
import { ResponseApi } from '../../../shared/models/response-api';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '../../../shared/services/toaster.service';
import { ProfileService } from '../../services/profile.service';
import { passwordValidator } from '../../../shared/validators/password.validator';
import { AccountSecurityDTO } from '../../models/dto/account-security.dto';
import { AuthService } from '../../../auth/service/auth.service';

@Component({
  selector: 'app-account-security',
  templateUrl: './account-security.component.html',
  styleUrl: './account-security.component.scss'
})
export class AccountSecurityComponent extends AbstractFormComponent<PersonalInfoModel>{

  @Input() userId: string | null = null;

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
      currentPassword: [null, [Validators.required, passwordValidator]],
      newPassword: [null, [Validators.required, passwordValidator]],
      confirmPassword: [null, [Validators.required, passwordValidator]],
    });
  }

  protected override getById(_: string): Observable<ResponseApi<PersonalInfoModel>> {
    throw new Error('Method not implemented.');
  }

  protected override update(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.markAsDirty();
      return;
    }
    const accountSecurityData = new AccountSecurityDTO(this.form.value);
    const subscription = this.profileService.updatePassword(this.userId as string, accountSecurityData)
    .pipe(
      tap((response) => {
        return this.toasterService.show(response.message, 'success');
      }),
      delay(2000)
    )
    .subscribe({
      next: (_: ResponseApi<boolean>) => {
        this.authService.logout();
      },
      error: (error) => {
        this.toasterService.show(error?.error?.message, 'error');
      }
    });
    this.subscriptions.push(subscription);
  }


}
