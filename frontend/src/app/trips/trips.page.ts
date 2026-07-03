import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripsService, Trip } from '../services/trips.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-trips',
  templateUrl: 'trips.page.html',
  styleUrls: ['trips.page.scss'],
  standalone: false,
})
export class TripsPage implements OnInit {
  trips: Trip[] = [];

  constructor(
    private tripsService: TripsService,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.tripsService.findAll().subscribe(t => this.trips = t);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  trackById(_index: number, t: Trip): string {
    return t.id;
  }
}
