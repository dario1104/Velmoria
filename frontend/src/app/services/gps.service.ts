import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface GpsPoint {
  latitude: number;
  longitude: number;
  timestamp: string;
  speed?: number;
  accuracy?: number;
  altitude?: number;
}

@Injectable({ providedIn: 'root' })
export class GpsService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPoints(tripId: string): Observable<GpsPoint[]> {
    return this.http.get<GpsPoint[]>(`${this.api}/trips/${tripId}/gps`);
  }

  createPoint(tripId: string, point: GpsPoint): Observable<any> {
    return this.http.post(`${this.api}/trips/${tripId}/gps`, point);
  }

  createBatch(points: (GpsPoint & { tripId: string })[]): Observable<{ count: number }> {
    return this.http.post<{ count: number }>(`${this.api}/gps/batch`, { points });
  }
}
