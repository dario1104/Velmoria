import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  location?: string;
  startTime: string;
  endTime: string;
  category?: string;
  color?: string;
}

@Injectable({ providedIn: 'root' })
export class CalendarService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  findAll(): Observable<CalendarEvent[]> {
    return this.http.get<CalendarEvent[]>(`${this.api}/calendar`);
  }

  create(event: Partial<CalendarEvent>): Observable<CalendarEvent> {
    return this.http.post<CalendarEvent>(`${this.api}/calendar`, event);
  }

  findByDate(date: string): Observable<CalendarEvent[]> {
    const params = new HttpParams().set('date', date);
    return this.http.get<CalendarEvent[]>(`${this.api}/calendar/by-date`, { params });
  }

  findByTrip(tripId: string): Observable<CalendarEvent[]> {
    return this.http.get<CalendarEvent[]>(`${this.api}/calendar/trip/${tripId}`);
  }

  findOne(id: string): Observable<CalendarEvent> {
    return this.http.get<CalendarEvent>(`${this.api}/calendar/${id}`);
  }

  update(id: string, data: Partial<CalendarEvent>): Observable<CalendarEvent> {
    return this.http.patch<CalendarEvent>(`${this.api}/calendar/${id}`, data);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/calendar/${id}`);
  }
}
