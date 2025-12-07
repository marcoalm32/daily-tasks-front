import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ResponseApi, ResponseBody } from '../../shared/models/response-api';
import { LoginResponseModel } from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url: string = environment.apiUrl + '/auth';
  private tokenKey: string = 'accessToken';
  private userKey: string = 'user_data';

  public isLoggedIn = signal<boolean>(false);
  public userData = signal<UserModel | null>(null);

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) { 

    this.initialValidate();
  }

  initialValidate(): void {
    if (typeof window !== 'undefined') {
      const isValid = this.isTokenValid();
      this.isLoggedIn.set(isValid);

      if (isValid) {
        const userData = localStorage.getItem(this.userKey);
        this.userData.set(userData ? JSON.parse(userData) : null);
      } else {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userKey);
        this.userData.set(null);
      }
    } else {
      this.isLoggedIn.set(false);
      this.userData.set(null);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp;
      const now = Math.floor(Date.now() / 1000);
      return now < expiry;
    } catch {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.isLoggedIn.set(false);
    this.userData.set(null);
    this.router.navigate(['/login']).then();
  }

  register(user: UserModel): Observable<ResponseApi<UserModel>> {
    const endpoint = this.url + '/register';
    return this.http.post<ResponseApi<UserModel>>(endpoint, user);
  }

  login(email: string, password: string): Observable<ResponseBody<LoginResponseModel>> {
    const endpoint = this.url + '/login';
    return this.http.post<ResponseBody<LoginResponseModel>>(endpoint, { email, password })
      .pipe(
        tap((response: ResponseBody<LoginResponseModel>) => {
          localStorage.setItem(this.tokenKey, response.data.token);
          localStorage.setItem(this.userKey, JSON.stringify({name: response.data.name, email: response.data.email}));
          this.isLoggedIn.set(true);
          this.userData.set({name: response.data.name, email: response.data.email} as UserModel);
        })
      );
  }

  getEmail(email: string): Observable<ResponseApi<string>> {
    const endPoint = this.url + '/email';
    return this.http.post<ResponseApi<string>>(endPoint, { email });
  }

  recoverPassword(token: string): Observable<ResponseApi<void>> {
    const endPoint = this.url + '/recovery-password';
    return this.http.post<ResponseApi<void>>(endPoint, { token });
  }

  createPassword(password: string, confirmPassword: string): Observable<ResponseApi<UserModel>> {
    const endPoint = this.url + '/create-password';
    return this.http.post<ResponseApi<UserModel>>(endPoint, { password, confirmPassword });
  }
  
}
