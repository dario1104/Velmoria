import { Component, OnInit } from '@angular/core';
import { SettingsService, UserSettings } from '../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
  standalone: false,
})
export class SettingsPage implements OnInit {
  settings: UserSettings = { id: '' };

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.get().subscribe(s => this.settings = s);
  }

  onThemeChange(theme: string): void {
    this.settings.theme = theme;
    this.settingsService.update({ theme }).subscribe();
  }

  onLanguageChange(language: string): void {
    this.settings.language = language;
    this.settingsService.update({ language }).subscribe();
  }

  onNotificationChange(key: string, value: boolean): void {
    const notifications = { ...this.settings.notifications, [key]: value };
    this.settings.notifications = notifications;
    this.settingsService.update({ notifications }).subscribe();
  }
}
