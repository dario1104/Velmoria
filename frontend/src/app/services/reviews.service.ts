import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Review {
  id: string;
  userId: string;
  poiId: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.api}/reviews`);
  }

  create(poiId: string, rating: number, comment?: string): Observable<Review> {
    return this.http.post<Review>(`${this.api}/reviews`, { poiId, rating, comment });
  }

  findByPlace(poiId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.api}/reviews/place/${poiId}`);
  }

  findOne(id: string): Observable<Review> {
    return this.http.get<Review>(`${this.api}/reviews/${id}`);
  }

  update(id: string, data: Partial<Review>): Observable<Review> {
    return this.http.patch<Review>(`${this.api}/reviews/${id}`, data);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/reviews/${id}`);
  }
}
