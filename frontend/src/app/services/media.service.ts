import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Media {
  id: string;
  markerId: string;
  url: string;
  type: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class MediaService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  findByMarker(markerId: string): Observable<Media[]> {
    return this.http.get<Media[]>(`${this.api}/markers/${markerId}/media`);
  }

  upload(formData: FormData): Observable<Media> {
    return this.http.post<Media>(`${this.api}/media/upload`, formData);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/media/${id}`);
  }
}
