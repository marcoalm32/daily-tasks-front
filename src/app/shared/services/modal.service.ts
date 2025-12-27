import { Injectable } from '@angular/core';
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

  confirm(title: string, message: string, width: string = '400px'): Observable<boolean> {
    const dialogRef = this.dialog.open(ModalComponent, {
      width,
      disableClose: true,
      data: { title, message }
    });
    return dialogRef.afterClosed();
  }
}
