import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface SearchResults {
  users?: any[];
  trips?: any[];
  pois?: any[];
  markers?: any[];
}

@Injectable({ providedIn: 'root' })
export class SearchService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  search(q: string, type?: string): Observable<SearchResults> {
    let params = new HttpParams().set('q', q);
    if (type) params = params.set('type', type);
    return this.http.get<SearchResults>(`${this.api}/search`, { params });
  }
}
