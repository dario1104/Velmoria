import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService, Message } from '../services/chat.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-conversation',
  templateUrl: 'conversation.page.html',
  styleUrls: ['conversation.page.scss'],
  standalone: false,
})
export class ConversationPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;
  userId = '';
  messages: Message[] = [];
  newMessage = '';
  loading = false;
  error = '';
  currentUserId = '';

  constructor(
    private route: ActivatedRoute,
    private chat: ChatService
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId') || '';
    this.loadMessages();
  }

  loadMessages() {
    if (!this.userId) return;
    this.loading = true;
    this.error = '';
    this.chat.getConversation(this.userId).subscribe({
      next: (data) => {
        this.messages = data;
        this.loading = false;
        setTimeout(() => this.content?.scrollToBottom(300), 100);
      },
      error: () => {
        this.error = 'Failed to load messages';
        this.loading = false;
      }
    });
  }

  send() {
    const content = this.newMessage.trim();
    if (!content || !this.userId) return;
    this.chat.send(this.userId, content).subscribe({
      next: (msg) => {
        this.messages.push(msg);
        this.newMessage = '';
        setTimeout(() => this.content?.scrollToBottom(300), 100);
      }
    });
  }

  trackByMessage(index: number, msg: Message) {
    return msg.id;
  }
}
