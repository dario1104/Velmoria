import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface PackingItem {
  id: string;
  tripId: string;
  item: string;
  quantity?: number;
  category?: string;
  packed?: boolean;
}

@Injectable({ providedIn: 'root' })
export class PackingService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  create(tripId: string, item: string, quantity?: number, category?: string): Observable<PackingItem> {
    return this.http.post<PackingItem>(`${this.api}/packing`, { tripId, item, quantity, category });
  }

  findByTrip(tripId: string): Observable<PackingItem[]> {
    return this.http.get<PackingItem[]>(`${this.api}/packing/trip/${tripId}`);
  }

  findOne(id: string): Observable<PackingItem> {
    return this.http.get<PackingItem>(`${this.api}/packing/${id}`);
  }

  update(id: string, data: Partial<PackingItem>): Observable<PackingItem> {
    return this.http.patch<PackingItem>(`${this.api}/packing/${id}`, data);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/packing/${id}`);
  }
}
