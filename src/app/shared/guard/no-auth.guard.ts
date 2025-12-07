import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})

export class NoAuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (!this.authService.isLoggedIn()) {
      return true;
    } else {
      return this.router.createUrlTree(['/tasks']);
    }
  }
}