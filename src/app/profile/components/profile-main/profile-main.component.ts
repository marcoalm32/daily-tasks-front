import { Component } from '@angular/core';
import { MESSAGES } from '../../../shared/messages/messages';
import { ProfileService } from '../../services/profile.service';
import { Subscription } from 'rxjs';
import { PersonalInfoModel } from '../../models/personal-info.model';
import { ToasterService } from '../../../shared/services/toaster.service';

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrl: './profile-main.component.scss'
})
export class ProfileMainComponent {
  messages = MESSAGES;
  subscriptions: Subscription[] = [];
  user: PersonalInfoModel | null = null;
  constructor(
    private readonly profileService: ProfileService,
    private readonly toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    const subscription = this.profileService.getProfile().subscribe({
      next: (response) => {
        this.user = response.data;
      },
      error: (error) => {
        this.toasterService.show(error?.error?.message, 'error');
      }
    });
    this.subscriptions.push(subscription);
  }
}
