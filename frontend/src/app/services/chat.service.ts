import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getConversation(userId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.api}/chat/conversation/${userId}`);
  }

  send(receiverId: string, content: string): Observable<Message> {
    return this.http.post<Message>(`${this.api}/chat`, { receiverId, content });
  }

  update(id: string, content: string): Observable<Message> {
    return this.http.patch<Message>(`${this.api}/chat/${id}`, { content });
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/chat/${id}`);
  }
}
