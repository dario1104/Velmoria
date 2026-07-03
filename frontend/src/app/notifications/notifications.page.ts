import { Component, OnInit } from '@angular/core';
import { NotificationsService, AppNotification } from '../services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: 'notifications.page.html',
  styleUrls: ['notifications.page.scss'],
  standalone: false,
})
export class NotificationsPage implements OnInit {
  notifications: AppNotification[] = [];
  loading = false;
  error = '';

  constructor(private notificationsService: NotificationsService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.loading = true;
    this.error = '';
    this.notificationsService.findAll().subscribe({
      next: (data) => {
        this.notifications = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load notifications';
        this.loading = false;
      }
    });
  }

  markRead(notification: AppNotification) {
    if (notification.read) return;
    this.notificationsService.markRead(notification.id).subscribe({
      next: () => {
        notification.read = true;
      }
    });
  }

  markAllRead() {
    this.notificationsService.markAllRead().subscribe({
      next: () => {
        this.notifications.forEach(n => n.read = true);
      }
    });
  }

  trackByNotification(index: number, notification: AppNotification) {
    return notification.id;
  }
}
