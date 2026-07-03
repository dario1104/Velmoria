import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Marker {
  id: string;
  tripId: string;
  latitude: number;
  longitude: number;
  type: string;
  content?: string;
  mood?: string;
  createdAt: string;
  media?: any[];
}

@Injectable({ providedIn: 'root' })
export class MarkersService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  findByTrip(tripId: string): Observable<Marker[]> {
    return this.http.get<Marker[]>(`${this.api}/trips/${tripId}/markers`);
  }

  findOne(id: string): Observable<Marker> {
    return this.http.get<Marker>(`${this.api}/markers/${id}`);
  }

  create(tripId: string, data: Partial<Marker>): Observable<Marker> {
    return this.http.post<Marker>(`${this.api}/trips/${tripId}/markers`, data);
  }

  update(id: string, data: Partial<Marker>): Observable<Marker> {
    return this.http.patch<Marker>(`${this.api}/markers/${id}`, data);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/markers/${id}`);
  }
}
