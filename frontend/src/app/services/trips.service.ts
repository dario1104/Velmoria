import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Trip {
  id: string;
  userId: string;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  createdAt: string;
  _count?: { points: number; markers: number };
}

@Injectable({ providedIn: 'root' })
export class TripsService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.api}/trips`);
  }

  findOne(id: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.api}/trips/${id}`);
  }

  create(title: string, description?: string): Observable<Trip> {
    return this.http.post<Trip>(`${this.api}/trips`, { title, description });
  }

  update(id: string, data: Partial<Trip>): Observable<Trip> {
    return this.http.patch<Trip>(`${this.api}/trips/${id}`, data);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/trips/${id}`);
  }

  finish(id: string): Observable<Trip> {
    return this.http.post<Trip>(`${this.api}/trips/${id}/finish`, {});
  }

  stats(id: string): Observable<any> {
    return this.http.get(`${this.api}/trips/${id}/stats`);
  }
}
