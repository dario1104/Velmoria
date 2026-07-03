import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Favorite {
  id: string;
  userId: string;
  poiId: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${this.api}/favorites`);
  }

  create(poiId: string): Observable<Favorite> {
    return this.http.post<Favorite>(`${this.api}/favorites`, { poiId });
  }

  remove(poiId: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/favorites/${poiId}`);
  }
}
