import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "../../auth/service/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private readonly authService: AuthService,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const token = this.authService.getToken();
        const isValid = this.authService.isTokenValid();

        if(token && isValid) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(req).pipe(
            catchError((error) => {
                if (error.status === 401) {
                    this.authService.logout();
                }
                return throwError(() => error);
            })
        );
    }
}
