import { Component } from '@angular/core';

interface Device {
  id: number;
  name: string;
  browser: string;
  lastActive: string;
  current: boolean;
}

@Component({
  selector: 'app-device-management',
  templateUrl: 'device-management.page.html',
  styleUrls: ['device-management.page.scss'],
  standalone: false,
})
export class DeviceManagementPage {
  devices: Device[] = [
    { id: 1, name: 'Windows PC', browser: 'Chrome 120', lastActive: 'Now', current: true },
    { id: 2, name: 'iPhone 15', browser: 'Safari 18', lastActive: '2 hours ago', current: false },
    { id: 3, name: 'MacBook Pro', browser: 'Firefox 121', lastActive: '3 days ago', current: false },
  ];
}
