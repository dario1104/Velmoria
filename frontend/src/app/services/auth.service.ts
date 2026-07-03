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

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  private storeTokens(r: any): void {
    localStorage.setItem('accessToken', r.accessToken);
    localStorage.setItem('refreshToken', r.refreshToken);
  }
}
