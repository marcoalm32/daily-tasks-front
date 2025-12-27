import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MatIconModule } from '@angular/material/icon';
import { LogoComponent } from '../shared/components/logo/logo.component';
import { FieldComponent } from '../shared/components/field/field.component';
import { ButtonComponent } from '../shared/components/button/button.component';
import { ContainerFormComponent } from '../shared/components/container-form/container-form.component';
import { NgxMaskDirective } from 'ngx-mask';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    LogoComponent,
    FieldComponent,
    ButtonComponent,
    ContainerFormComponent,
    NgxMaskDirective,
  ]
})
export class AuthModule { }
