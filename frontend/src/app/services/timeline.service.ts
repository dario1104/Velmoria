import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface TimelineEvent {
  id: string;
  tripId: string;
  type: string;
  title: string;
  content?: string;
  latitude?: number;
  longitude?: number;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class TimelineService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  findByTrip(tripId: string): Observable<TimelineEvent[]> {
    return this.http.get<TimelineEvent[]>(`${this.api}/trips/${tripId}/timeline`);
  }

  create(tripId: string, event: Partial<TimelineEvent>): Observable<TimelineEvent> {
    return this.http.post<TimelineEvent>(`${this.api}/trips/${tripId}/timeline`, event);
  }
}
