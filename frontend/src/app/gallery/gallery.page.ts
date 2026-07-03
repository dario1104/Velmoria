import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkersService, Marker } from '../services/markers.service';
import { MediaService, Media } from '../services/media.service';

@Component({
  selector: 'app-gallery',
  templateUrl: 'gallery.page.html',
  styleUrls: ['gallery.page.scss'],
  standalone: false,
})
export class GalleryPage implements OnInit {
  markers: Marker[] = [];
  markerMedia: Map<string, Media[]> = new Map();
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private markersService: MarkersService,
    private mediaService: MediaService,
  ) {}

  ngOnInit(): void {
    const tripId = this.route.snapshot.paramMap.get('id')!;
    this.markersService.findByTrip(tripId).subscribe({
      next: (markers) => {
        this.markers = markers;
        this.loadMedia(markers);
      },
      error: () => this.loading = false,
    });
  }

  loadMedia(markers: Marker[]): void {
    if (markers.length === 0) {
      this.loading = false;
      return;
    }
    let count = 0;
    for (const marker of markers) {
      this.mediaService.findByMarker(marker.id).subscribe({
        next: (media) => {
          this.markerMedia.set(marker.id, media);
        },
        complete: () => {
          count++;
          if (count === markers.length) this.loading = false;
        },
      });
    }
  }

  getMedia(marker: Marker): Media[] {
    return this.markerMedia.get(marker.id) || [];
  }

  trackByMarkerId(_index: number, marker: Marker): string {
    return marker.id;
  }

  trackByMediaId(_index: number, media: Media): string {
    return media.id;
  }
}
