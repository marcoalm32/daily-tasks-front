import { Component } from '@angular/core';
import { MESSAGES } from '../../../shared/messages/messages';

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrl: './profile-main.component.scss'
})
export class ProfileMainComponent {
  messages = MESSAGES;

  
}
