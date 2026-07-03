import { Component, OnInit } from '@angular/core';
import { SocialService, User } from '../services/social.service';

@Component({
  selector: 'app-friends',
  templateUrl: 'friends.page.html',
  styleUrls: ['friends.page.scss'],
  standalone: false,
})
export class FriendsPage implements OnInit {
  friends: User[] = [];
  searchQuery = '';
  searchResults: User[] = [];
  pendingRequests: any[] = [];
  loading = false;
  error = '';

  constructor(private social: SocialService) {}

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

  search() {
    if (!this.searchQuery.trim()) {
      this.searchResults = [];
      return;
    }
    this.social.searchFriends(this.searchQuery).subscribe({
      next: (data) => this.searchResults = data,
      error: () => this.searchResults = []
    });
  }

  addFriend(userId: string) {
    this.social.sendRequest(userId).subscribe({
      next: () => {
        this.searchQuery = '';
        this.searchResults = [];
      }
    });
  }

  acceptRequest(id: string) {
    this.social.acceptRequest(id).subscribe({
      next: () => this.loadFriends()
    });
  }

  rejectRequest(id: string) {
    this.social.rejectRequest(id).subscribe({
      next: () => this.loadFriends()
    });
  }

  removeFriend(userId: string) {
    this.social.removeFriend(userId).subscribe({
      next: () => this.loadFriends()
    });
  }

  trackByUser(index: number, user: User) {
    return user.id;
  }

  trackByRequest(index: number, req: any) {
    return req.id;
  }
}
