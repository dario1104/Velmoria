import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshing = false;

  constructor(private auth: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getAccessToken();
    if (token) {
      req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }

    return next.handle(req).pipe(
      catchError(err => {
        if (err.status === 401 && !this.refreshing) {
          this.refreshing = true;
          return this.auth.refresh().pipe(
            switchMap(() => {
              this.refreshing = false;
              const newToken = this.auth.getAccessToken()!;
              return next.handle(req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } }));
            }),
            catchError(() => {
              this.refreshing = false;
              this.auth.logout();
              this.router.navigate(['/login']);
              return throwError(() => err);
            }),
          );
        }
        return throwError(() => err);
      }),
    );
  }
}
