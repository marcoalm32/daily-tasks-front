import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MESSAGES } from '../../messages/messages';
import { ButtonComponent } from '../button/button.component';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    MatCardModule,
    ButtonComponent,
  ],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.scss'
})
export class UploadImageComponent {

  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  error: string | null = null;
  message = MESSAGES;
  @Input() imageUrl: string | null = null;
  @Output() imageUploaded = new EventEmitter<File>();
  //To Do: url para capturar a imagem de forma provisória em modo de DEV
  viewImageUrl: string = 'http://localhost:3000'
  

  constructor(
    private readonly toasterService: ToasterService,
  ) {

  }

  sendImage() {
    if (!this.selectedFile) {
      this.toasterService.show(this.message.notifications.noImageSelected, 'warning');
      return;
    };
    this.imageUploaded.emit(this.selectedFile!);
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = e => this.previewUrl = reader.result;
      reader.readAsDataURL(file);
    }
  }

}