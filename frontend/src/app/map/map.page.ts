import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { TripsService, Trip } from '../services/trips.service';
import { GpsService, GpsPoint } from '../services/gps.service';
import { MarkersService, Marker } from '../services/markers.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss'],
  standalone: false,
})
export class MapPage implements OnInit, AfterViewInit {
  trips: Trip[] = [];
  selectedTripId = '';

  private map!: L.Map;
  private gpsLayer = L.layerGroup();
  private markerLayer = L.layerGroup();

  @ViewChild('mapContainer') mapContainer!: ElementRef;

  constructor(
    private tripsService: TripsService,
    private gpsService: GpsService,
    private markersService: MarkersService,
  ) {}

  ngOnInit(): void {
    this.tripsService.findAll().subscribe(t => this.trips = t);
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  onTripChange(): void {
    this.clearLayers();
    if (!this.selectedTripId) {
      this.loadAllTrips();
      return;
    }
    this.loadTripData(this.selectedTripId);
  }

  private initMap(): void {
    this.map = L.map(this.mapContainer.nativeElement).setView([41.9, 12.5], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    this.gpsLayer.addTo(this.map);
    this.markerLayer.addTo(this.map);
  }

  private loadAllTrips(): void {
    this.trips.forEach(t => this.loadTripData(t.id));
  }

  private loadTripData(tripId: string): void {
    this.gpsService.getPoints(tripId).subscribe(points => {
      if (points.length === 0) return;
      const latlngs = points.map(p => L.latLng(p.latitude, p.longitude));
      const polyline = L.polyline(latlngs, { color: '#7C4DFF', weight: 3 });
      this.gpsLayer.addLayer(polyline);
      if (!this.selectedTripId) return;
      this.map.fitBounds(polyline.getBounds().pad(0.1));
    });

    this.markersService.findByTrip(tripId).subscribe(markers => {
      markers.forEach(m => {
        const icon = L.divIcon({
          className: '',
          html: `<div style="width:16px;height:16px;border-radius:50%;background:#FC0B7B;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.3)"></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });
        const marker = L.marker([m.latitude, m.longitude], { icon })
          .bindPopup(`<b>${m.content || ''}</b>${m.mood ? '<br>' + m.mood : ''}`);
        this.markerLayer.addLayer(marker);
      });
    });
  }

  private clearLayers(): void {
    this.gpsLayer.clearLayers();
    this.markerLayer.clearLayers();
  }
}
