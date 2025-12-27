import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileMainComponent } from './components/profile-main/profile-main.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile-main',
    pathMatch: 'full'
  },
  {
    path: 'profile-main',
    component: ProfileMainComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
