import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Report {
  id: string;
  reporterId: string;
  contentId: string;
  reason: string;
  resolved: boolean;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/admin/users`);
  }

  getUser(userId: string): Observable<any> {
    return this.http.get(`${this.api}/admin/users/${userId}`);
  }

  updateRole(userId: string, role: string): Observable<any> {
    return this.http.patch(`${this.api}/admin/users/${userId}/role`, { role });
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/admin/users/${userId}`);
  }

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.api}/admin/reports`);
  }

  resolveReport(id: string): Observable<void> {
    return this.http.patch<void>(`${this.api}/admin/reports/${id}/resolve`, {});
  }

  moderate(contentId: string, action: string): Observable<void> {
    return this.http.post<void>(`${this.api}/admin/moderate`, { contentId, action });
  }

  getStats(): Observable<any> {
    return this.http.get(`${this.api}/admin/stats`);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/admin/categories`);
  }

  createCategory(name: string): Observable<any> {
    return this.http.post(`${this.api}/admin/categories`, { name });
  }

  updateCategory(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.api}/admin/categories/${id}`, data);
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/admin/categories/${id}`);
  }
}
