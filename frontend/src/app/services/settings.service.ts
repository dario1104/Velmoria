import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UserSettings {
  id: string;
  theme?: string;
  language?: string;
  privacy?: any;
  notifications?: any;
}

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get(): Observable<UserSettings> {
    return this.http.get<UserSettings>(`${this.api}/auth/settings`);
  }

  update(settings: Partial<UserSettings>): Observable<UserSettings> {
    return this.http.patch<UserSettings>(`${this.api}/auth/settings`, settings);
  }
}
