import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy-settings',
  templateUrl: 'privacy-settings.page.html',
  styleUrls: ['privacy-settings.page.scss'],
  standalone: false,
})
export class PrivacySettingsPage {
  profileVisibility = 'public';
  showEmail = false;
  showLocation = true;
  dataCollection = true;
}
