import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Expense {
  id: string;
  tripId: string;
  userId: string;
  amount: number;
  category: string;
  description?: string;
  date: string;
  split?: any;
}

@Injectable({ providedIn: 'root' })
export class ExpensesService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  create(tripId: string, amount: number, category: string, description?: string): Observable<Expense> {
    return this.http.post<Expense>(`${this.api}/expenses`, { tripId, amount, category, description });
  }

  history(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.api}/expenses/history`);
  }

  findByTrip(tripId: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.api}/expenses/trip/${tripId}`);
  }

  balance(tripId: string): Observable<any> {
    return this.http.get(`${this.api}/expenses/trip/${tripId}/balance`);
  }

  findOne(id: string): Observable<Expense> {
    return this.http.get<Expense>(`${this.api}/expenses/${id}`);
  }

  update(id: string, data: Partial<Expense>): Observable<Expense> {
    return this.http.patch<Expense>(`${this.api}/expenses/${id}`, data);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/expenses/${id}`);
  }

  split(id: string, members: any[]): Observable<Expense> {
    return this.http.post<Expense>(`${this.api}/expenses/${id}/split`, { members });
  }
}
