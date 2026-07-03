import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface PointOfInterest {
  id: string;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  category?: string;
  rating?: number;
  tags?: string[];
}

@Injectable({ providedIn: 'root' })
export class PoiService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  findAll(): Observable<PointOfInterest[]> {
    return this.http.get<PointOfInterest[]>(`${this.api}/poi`);
  }

  search(q: string): Observable<PointOfInterest[]> {
    const params = new HttpParams().set('q', q);
    return this.http.get<PointOfInterest[]>(`${this.api}/poi/search`, { params });
  }

  nearby(lat: number, lng: number, radius: number): Observable<PointOfInterest[]> {
    const params = new HttpParams().set('lat', lat).set('lng', lng).set('radius', radius);
    return this.http.get<PointOfInterest[]>(`${this.api}/poi/nearby`, { params });
  }

  create(data: Partial<PointOfInterest>): Observable<PointOfInterest> {
    return this.http.post<PointOfInterest>(`${this.api}/poi`, data);
  }

  findOne(id: string): Observable<PointOfInterest> {
    return this.http.get<PointOfInterest>(`${this.api}/poi/${id}`);
  }

  update(id: string, data: Partial<PointOfInterest>): Observable<PointOfInterest> {
    return this.http.patch<PointOfInterest>(`${this.api}/poi/${id}`, data);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/poi/${id}`);
  }
}
