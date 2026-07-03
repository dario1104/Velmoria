import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GpsService } from './gps.service';

export interface GeoPosition {
  latitude: number;
  longitude: number;
  speed?: number;
  accuracy?: number;
  altitude?: number;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class GeoLocationService {
  private watchId: number | null = null;
  private positionSubject = new Subject<GeoPosition>();
  private activeTripId: string | null = null;

  constructor(private gpsService: GpsService, private ngZone: NgZone) {}

  get position$(): Observable<GeoPosition> {
    return this.positionSubject.asObservable();
  }

  startTracking(tripId: string): void {
    this.stopTracking();
    this.activeTripId = tripId;
    if (!navigator.geolocation) return;
    this.watchId = navigator.geolocation.watchPosition(
      (pos) => {
        this.ngZone.run(() => {
          const point: GeoPosition = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            speed: pos.coords.speed ?? undefined,
            accuracy: pos.coords.accuracy,
            altitude: pos.coords.altitude ?? undefined,
            timestamp: new Date(pos.timestamp).toISOString(),
          };
          this.positionSubject.next(point);
          this.gpsService.createPoint(tripId, point).subscribe();
        });
      },
      (err) => console.warn('Geolocation error:', err),
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 },
    );
  }

  stopTracking(): void {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
    this.activeTripId = null;
  }

  isTracking(): boolean {
    return this.watchId !== null;
  }
}
