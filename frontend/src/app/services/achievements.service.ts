import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Achievement {
  id: string;
  userId: string;
  badge: string;
  title: string;
  icon: string;
  earnedAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}

@Injectable({ providedIn: 'root' })
export class AchievementsService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Achievement[]> {
    return this.http.get<Achievement[]>(`${this.api}/achievements`);
  }

  badges(): Observable<Badge[]> {
    return this.http.get<Badge[]>(`${this.api}/achievements/badges`);
  }
}
