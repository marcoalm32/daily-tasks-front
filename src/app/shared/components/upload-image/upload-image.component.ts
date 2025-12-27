import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.scss'
})
export class UploadImageComponent {

  selectedFile: File | null = null;
  preview: string | ArrayBuffer | null = null;
  error: string | null = null;
  @Input() image: string | null = null;
  @Output() imageUploaded = new EventEmitter<File>();

  constructor() {

  }

  sendImage() {
    if (this.selectedFile) {
      this.imageUploaded.emit(this.selectedFile);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];

      if (!file.type.startsWith('image/')) {
        this.error = 'Por favor, selecione um arquivo de imagem.';
        return;
      }

      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.preview = reader.result;
      }
      reader.readAsDataURL(file);
    }
  }

  getImageBase64(base64: string) {
    this.preview = base64;
  }
}