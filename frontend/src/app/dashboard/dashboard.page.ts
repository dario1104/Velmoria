import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { TripsService, Trip } from '../services/trips.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage {
  user: { name?: string; email: string } | null = null;
  trips: Trip[] = [];
  stats = { total: 0, active: 0, markers: 0 };

  constructor(
    private auth: AuthService,
    private tripsService: TripsService,
    private router: Router,
    private menu: MenuController,
  ) {}

  ionViewWillEnter(): void {
    this.auth.profile().subscribe(u => this.user = u);
    this.tripsService.findAll().subscribe(t => {
      this.trips = t;
      this.stats.total = t.length;
      this.stats.active = t.filter(t => t.isActive).length;
      this.stats.markers = t.reduce((acc, t) => acc + (t._count?.markers || 0), 0);
    });
  }

  openMenu(): void {
    this.menu.open('main');
  }

  get activeTrip(): Trip | undefined {
    return this.trips.find(t => t.isActive);
  }

  get recentTrips(): Trip[] {
    return this.trips.slice(0, 3);
  }

  newTrip(): void {
    this.router.navigate(['/trip-form']);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
