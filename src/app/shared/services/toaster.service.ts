import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToasterComponent, ToasterType } from '../components/toaster/toaster.component';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(
    private readonly snackBar: MatSnackBar,
  ) { }

  show(message: string, type: ToasterType, duration: number = 3000): void {
    this.snackBar.openFromComponent(ToasterComponent, {
      duration,
      panelClass: [type],
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      data: {message, type}
    })
  }
}
