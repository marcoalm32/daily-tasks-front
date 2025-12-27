import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileMainComponent } from './components/profile-main/profile-main.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { AccountSecurityComponent } from './components/account-security/account-security.component';
import { UploadImageComponent } from '../shared/components/upload-image/upload-image.component';
import { ContainerFormComponent } from '../shared/components/container-form/container-form.component';
import { FieldComponent } from '../shared/components/field/field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../shared/components/button/button.component';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    ProfileMainComponent,
    PersonalInfoComponent,
    AccountSecurityComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    UploadImageComponent,
    ContainerFormComponent,
    FieldComponent,
    ReactiveFormsModule,
    ButtonComponent,
    MatTabsModule,
  ]
})
export class ProfileModule { }
