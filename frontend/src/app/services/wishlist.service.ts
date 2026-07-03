import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface WishlistItem {
  id: string;
  title: string;
  destination?: string;
  notes?: string;
  completed?: boolean;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  findAll(): Observable<WishlistItem[]> {
    return this.http.get<WishlistItem[]>(`${this.api}/wishlist`);
  }

  create(title: string, destination?: string, notes?: string): Observable<WishlistItem> {
    return this.http.post<WishlistItem>(`${this.api}/wishlist`, { title, destination, notes });
  }

  findOne(id: string): Observable<WishlistItem> {
    return this.http.get<WishlistItem>(`${this.api}/wishlist/${id}`);
  }

  update(id: string, data: Partial<WishlistItem>): Observable<WishlistItem> {
    return this.http.patch<WishlistItem>(`${this.api}/wishlist/${id}`, data);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/wishlist/${id}`);
  }
}
