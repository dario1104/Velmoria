import { Component } from '@angular/core';
import { SocialService, User } from '../services/social.service';

@Component({
  selector: 'app-user-search',
  templateUrl: 'user-search.page.html',
  styleUrls: ['user-search.page.scss'],
  standalone: false,
})
export class UserSearchPage {
  searchQuery = '';
  results: User[] = [];
  loading = false;
  error = '';
  searched = false;

  constructor(private social: SocialService) {}

  search() {
    const q = this.searchQuery.trim();
    if (!q) {
      this.results = [];
      this.searched = false;
      return;
    }
    this.loading = true;
    this.error = '';
    this.searched = true;
    this.social.searchFriends(q).subscribe({
      next: (data) => {
        this.results = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Search failed';
        this.loading = false;
      }
    });
  }

  sendRequest(userId: string) {
    this.social.sendRequest(userId).subscribe();
  }

  trackByUser(index: number, user: User) {
    return user.id;
  }
}
