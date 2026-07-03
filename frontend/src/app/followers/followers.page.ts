import { Component, OnInit } from '@angular/core';
import { SocialService, User } from '../services/social.service';

@Component({
  selector: 'app-followers',
  templateUrl: 'followers.page.html',
  styleUrls: ['followers.page.scss'],
  standalone: false,
})
export class FollowersPage implements OnInit {
  followers: User[] = [];
  loading = false;
  error = '';

  constructor(private social: SocialService) {}

  ngOnInit() {
    this.loadFollowers();
  }

  loadFollowers() {
    this.loading = true;
    this.error = '';
    this.social.getFollowers().subscribe({
      next: (data) => {
        this.followers = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load followers';
        this.loading = false;
      }
    });
  }

  trackByUser(index: number, user: User) {
    return user.id;
  }
}
