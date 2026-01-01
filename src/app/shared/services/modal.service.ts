import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private readonly dialog: MatDialog
  ) { }

  confirm(title: string, message: string, contentTemplate?: TemplateRef<any>, width: string = '400px'): Observable<boolean> {
    const dialogRef = this.dialog.open(ModalComponent, {
      width,
      disableClose: true,
      data: { title, message, contentTemplate }
    });
    return dialogRef.afterClosed();
  }
}
