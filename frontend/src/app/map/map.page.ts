import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripsService, Trip } from '../services/trips.service';

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss'],
  standalone: false,
})
export class MapPage implements OnInit {
  trips: Trip[] = [];
  selectedTripId = '';

  constructor(private tripsService: TripsService, private router: Router) {}

  ngOnInit(): void {
    this.tripsService.findAll().subscribe(t => this.trips = t);
  }

  openTrip(): void {
    if (this.selectedTripId) {
      this.router.navigate(['/trip-detail', this.selectedTripId]);
    }
  }
}
