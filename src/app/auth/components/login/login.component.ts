import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from '../../../shared/services/toaster.service';
import { passwordValidator } from '../../../shared/validators/password.validator';
import { MESSAGES } from '../../../shared/messages/messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  protected subscriptions: Subscription[] = [];
  message = MESSAGES;
  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly toasterService: ToasterService,
  ) { 
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator]],
    });
  }

  login(): void {
    if (this.form.invalid) return;
    const { email, password } = this.form.value;
    const subscription: Subscription = this.authService.login({ email, password }).subscribe({
      next: (_) => {
        this.form.reset();
        this.router.navigate(['/tasks']).then();
        this.toasterService.show('Usuário logado com sucesso', 'success');
      },
      error: (error) => {
        this.toasterService.show(error?.error?.message, 'error');
      }
    })
    this.subscriptions.push(subscription);
  }

}
