import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface DiaryEntry {
  id: string;
  tripId: string;
  userId: string;
  date: string;
  title?: string;
  content?: string;
  mood?: string;
  weather?: string;
}

@Injectable({ providedIn: 'root' })
export class DiaryService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  findAll(): Observable<DiaryEntry[]> {
    return this.http.get<DiaryEntry[]>(`${this.api}/diary`);
  }

  create(entry: Partial<DiaryEntry>): Observable<DiaryEntry> {
    return this.http.post<DiaryEntry>(`${this.api}/diary`, entry);
  }

  findByTrip(tripId: string): Observable<DiaryEntry[]> {
    return this.http.get<DiaryEntry[]>(`${this.api}/diary/trip/${tripId}`);
  }

  findOne(id: string): Observable<DiaryEntry> {
    return this.http.get<DiaryEntry>(`${this.api}/diary/${id}`);
  }

  update(id: string, data: Partial<DiaryEntry>): Observable<DiaryEntry> {
    return this.http.patch<DiaryEntry>(`${this.api}/diary/${id}`, data);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/diary/${id}`);
  }
}
