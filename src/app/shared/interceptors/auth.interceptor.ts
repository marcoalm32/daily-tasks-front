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

        let headers = req.headers;

        if (token && isValid) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }

        if (headers.has('Content-Type') && req.body instanceof FormData) {
            headers = headers.delete('Content-Type');
        }

        const authReq = req.clone({ headers });

        return next.handle(authReq).pipe(
            catchError((error) => {
                if (error.status === 401) {
                    this.authService.logout();
                }
                return throwError(() => error);
            })
        );
    }
}
