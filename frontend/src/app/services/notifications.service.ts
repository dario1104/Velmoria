import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AppNotification {
  id: string;
  type: string;
  message: string;
  read: boolean;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  findAll(): Observable<AppNotification[]> {
    return this.http.get<AppNotification[]>(`${this.api}/notifications`);
  }

  unreadCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.api}/notifications/unread-count`);
  }

  markRead(id: string): Observable<void> {
    return this.http.patch<void>(`${this.api}/notifications/${id}/read`, {});
  }

  markAllRead(): Observable<void> {
    return this.http.patch<void>(`${this.api}/notifications/read-all`, {});
  }
}
