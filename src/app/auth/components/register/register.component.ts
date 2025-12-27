import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { ResponseApi } from '../../../shared/models/response-api';
import { ToasterService } from '../../../shared/services/toaster.service';
import { passwordValidator } from '../../../shared/validators/password.validator';
import { MESSAGES } from '../../../shared/messages/messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  protected subscriptions: Subscription[] = [];
  message = MESSAGES.inputs;
  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly toasterService: ToasterService,
    private readonly authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.markAsPristine();
      return;
    }
    const subscription: Subscription = this.authService.register(this.form.value).subscribe({
      next: (response: ResponseApi<UserModel>) => {
        this.form.reset();
        this.router.navigate(['/login']).then();
        this.toasterService.show(response.message, 'success');
      }, 
      error: (err) => {
        this.toasterService.show(err.error.message || 'Erro ao registrar usuário', 'error');
      }
    });
    this.subscriptions.push(subscription);
  }

  cancel(): void {
    this.form.reset();
    this.router.navigate(['/login']).then();
  }

}
