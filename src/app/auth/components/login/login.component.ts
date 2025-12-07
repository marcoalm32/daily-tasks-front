import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { AbstractFormComponent } from '../../../shared/abstract/abstract-form.component';
import { UserModel } from '../../models/user.model';
import { ResponseApi } from '../../../shared/models/response-api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends AbstractFormComponent<UserModel> {

  constructor(
    protected override readonly fb: FormBuilder,
    protected override readonly route: ActivatedRoute,
    protected override readonly router: Router,
    private readonly authService: AuthService,
  ) { 
    super(fb, null as any, router);
  }

  createForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login(): void {
    if (this.form.invalid) return;
    const { email, password } = this.form.value;
    const subscription: Subscription = this.authService.login(email, password).subscribe({
      next: (_) => {
        this.form.reset();
        this.router.navigate(['/tasks']).then();
      },
      error: (error) => {
        console.log('Login error:', error);
      }
    })
    this.subscriptions.push(subscription);
  }

  protected override getById(id: string): Observable<ResponseApi<UserModel>> {
    throw new Error('Method not implemented.');
  }

}
