import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { AbstractFormComponent } from '../../../shared/abstract/abstract-form.component';
import { UserModel } from '../../models/user.model';
import { ResponseApi } from '../../../shared/models/response-api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends AbstractFormComponent<UserModel> {

  constructor(
    protected override readonly fb: FormBuilder,
    protected override readonly route: ActivatedRoute,
    protected override readonly router: Router,
    private readonly authService: AuthService,
  ) {
    super(fb, route, router);
  }

  createForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  protected override getById(id: string): Observable<ResponseApi<UserModel>> {
    throw new Error('Method not implemented.');
  }

  register(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.markAsPristine();
      return;
    }
    const subscription: Subscription = this.authService.register(this.form.value).subscribe({
      next: (_) => {
        this.form.reset();
        this.router.navigate(['/login']).then();
      }, 
      error: (err) => {
        console.error('Registration error:', err);
      }
    });
    this.subscriptions.push(subscription);
  }

}
