import { Component, OnInit } from '@angular/core';
import { SocialService, User } from '../services/social.service';

@Component({
  selector: 'app-following',
  templateUrl: 'following.page.html',
  styleUrls: ['following.page.scss'],
  standalone: false,
})
export class FollowingPage implements OnInit {
  following: User[] = [];
  loading = false;
  error = '';

  constructor(private social: SocialService) {}

  ngOnInit() {
    this.loadFollowing();
  }

  loadFollowing() {
    this.loading = true;
    this.error = '';
    this.social.getFollowing().subscribe({
      next: (data) => {
        this.following = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load following';
        this.loading = false;
      }
    });
  }

  trackByUser(index: number, user: User) {
    return user.id;
  }
}
