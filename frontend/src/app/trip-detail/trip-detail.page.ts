import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripsService, Trip } from '../services/trips.service';
import { GpsService, GpsPoint } from '../services/gps.service';
import { MarkersService, Marker } from '../services/markers.service';
import { GeoLocationService } from '../services/geo-location.service';

@Component({
  selector: 'app-trip-detail',
  templateUrl: 'trip-detail.page.html',
  styleUrls: ['trip-detail.page.scss'],
  standalone: false,
})
export class TripDetailPage implements OnInit, OnDestroy {
  trip?: Trip;
  markers: Marker[] = [];
  stats: any = null;
  tracking = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripsService: TripsService,
    private gpsService: GpsService,
    private markersService: MarkersService,
    private geo: GeoLocationService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.tripsService.findOne(id).subscribe(t => {
      this.trip = t;
      if (this.route.snapshot.queryParamMap.get('startTracking') === 'true' && t.isActive) {
        this.geo.startTracking(t.id);
        this.tracking = true;
      }
    });
    this.markersService.findByTrip(id).subscribe(m => this.markers = m);
    this.tripsService.stats(id).subscribe(s => this.stats = s);
  }

  finish(): void {
    if (!this.trip) return;
    this.geo.stopTracking();
    this.tracking = false;
    this.tripsService.finish(this.trip.id).subscribe(() => {
      this.trip!.isActive = false;
    });
  }

  delete(): void {
    if (!this.trip) return;
    this.tripsService.remove(this.trip.id).subscribe(() => {
      this.router.navigate(['/trips']);
    });
  }

  edit(): void {
    this.router.navigate(['/trip-form', this.trip!.id]);
  }

  ngOnDestroy(): void {
    this.geo.stopTracking();
  }

  toggleTracking(): void {
    if (!this.trip) return;
    if (this.tracking) {
      this.geo.stopTracking();
      this.tracking = false;
    } else {
      this.geo.startTracking(this.trip.id);
      this.tracking = true;
    }
  }

  formatTime(seconds: number): string {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    const m = Math.floor(seconds / 60);
    if (m < 60) return `${m}m`;
    const h = Math.floor(m / 60);
    return `${h}h ${m % 60}m`;
  }

  markerIcon(type: string): string {
    const icons: Record<string, string> = {
      photo: 'camera-outline',
      note: 'document-text-outline',
      food: 'restaurant-outline',
      accommodation: 'bed-outline',
      transport: 'car-outline',
    };
    return icons[type] || 'location-outline';
  }

  trackByMarkerId(_index: number, m: Marker): string {
    return m.id;
  }
}
