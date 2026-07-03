import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialService, User } from '../services/social.service';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss'],
  standalone: false,
})
export class ChatPage implements OnInit {
  friends: User[] = [];
  loading = false;
  error = '';

  constructor(
    private social: SocialService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadFriends();
  }

  loadFriends() {
    this.loading = true;
    this.error = '';
    this.social.getFriends().subscribe({
      next: (data) => {
        this.friends = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load friends';
        this.loading = false;
      }
    });
  }

  openConversation(userId: string) {
    this.router.navigate(['/chat/conversation', userId]);
  }

  trackByUser(index: number, user: User) {
    return user.id;
  }
}
