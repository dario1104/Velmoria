import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AuthResponse {
  user: { id: string; email: string; name?: string };
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/auth/login`, { email, password })
      .pipe(tap(r => this.storeTokens(r)));
  }

  register(email: string, password: string, name?: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/auth/register`, { email, password, name })
      .pipe(tap(r => this.storeTokens(r)));
  }

  refresh(): Observable<{ accessToken: string; refreshToken: string; expiresIn: number }> {
    const refreshToken = localStorage.getItem('refreshToken') || '';
    return this.http.post<{ accessToken: string; refreshToken: string; expiresIn: number }>(
      `${this.api}/auth/refresh`, { refreshToken }
    ).pipe(tap(r => this.storeTokens(r)));
  }

  profile(): Observable<{ id: string; email: string; name?: string }> {
    return this.http.get<{ id: string; email: string; name?: string }>(`${this.api}/auth/profile`);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  verifyEmail(token: string): Observable<any> {
    return this.http.get(`${this.api}/auth/verify-email/${token}`);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.api}/auth/forgot-password`, { email });
  }

  resetPassword(token: string, password: string): Observable<any> {
    return this.http.post(`${this.api}/auth/reset-password`, { token, password });
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.api}/auth/change-password`, { currentPassword, newPassword });
  }

  updateProfile(data: { name?: string }): Observable<any> {
    return this.http.patch(`${this.api}/auth/profile`, data);
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  private storeTokens(r: any): void {
    localStorage.setItem('accessToken', r.accessToken);
    localStorage.setItem('refreshToken', r.refreshToken);
  }
}
