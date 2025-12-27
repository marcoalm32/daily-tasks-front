import { Component } from '@angular/core';
import { AbstractFormComponent } from '../../../shared/abstract/abstract-form.component';
import { PersonalInfoModel } from '../../models/personal-info.model';
import { Observable } from 'rxjs';
import { ResponseApi } from '../../../shared/models/response-api';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '../../../shared/services/toaster.service';
import { ProfileService } from '../../services/profile.service';
import { passwordValidator } from '../../../shared/validators/password.validator';

@Component({
  selector: 'app-account-security',
  templateUrl: './account-security.component.html',
  styleUrl: './account-security.component.scss'
})
export class AccountSecurityComponent extends AbstractFormComponent<PersonalInfoModel>{

  constructor(
    protected override readonly fb: FormBuilder,
    protected override readonly route: ActivatedRoute,
    protected override readonly router: Router,
    protected override readonly toasterService: ToasterService,
    protected readonly profileService: ProfileService,
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

  protected override getById(id: string): Observable<ResponseApi<PersonalInfoModel>> {
    throw new Error('Method not implemented.');
  }


}
