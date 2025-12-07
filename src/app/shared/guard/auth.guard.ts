import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../auth/service/auth.service";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {
  constructor(
    private readonly authService: AuthService, 
    private readonly router: Router
  ) {}

  canActivate(): boolean {
    if (!this.authService.isTokenValid()) {
        this.router.navigate(['/login']).then();
        return false;
    }
    return true;
  }
}
