import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

@Injectable({ providedIn: 'root' })
export class SocialService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getFriends(): Observable<User[]> {
    return this.http.get<User[]>(`${this.api}/friends`);
  }

  getFollowers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.api}/friends/followers`);
  }

  getFollowing(): Observable<User[]> {
    return this.http.get<User[]>(`${this.api}/friends/following`);
  }

  searchFriends(query: string): Observable<User[]> {
    return this.http.post<User[]>(`${this.api}/friends/search`, { query });
  }

  sendRequest(friendId: string): Observable<any> {
    return this.http.post(`${this.api}/friends/request`, { friendId });
  }

  acceptRequest(id: string): Observable<any> {
    return this.http.patch(`${this.api}/friends/request/${id}/accept`, {});
  }

  rejectRequest(id: string): Observable<any> {
    return this.http.patch(`${this.api}/friends/request/${id}/reject`, {});
  }

  cancelRequest(id: string): Observable<any> {
    return this.http.delete(`${this.api}/friends/request/${id}`);
  }

  removeFriend(friendId: string): Observable<any> {
    return this.http.delete(`${this.api}/friends/${friendId}`);
  }
}
