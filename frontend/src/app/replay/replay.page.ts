import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReplayService } from '../services/replay.service';
import { GpsService, GpsPoint } from '../services/gps.service';

@Component({
  selector: 'app-replay',
  templateUrl: 'replay.page.html',
  styleUrls: ['replay.page.scss'],
  standalone: false,
})
export class ReplayPage implements OnInit {
  replayData: any = null;
  gpsPoints: GpsPoint[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private replayService: ReplayService,
    private gpsService: GpsService,
  ) {}

  ngOnInit(): void {
    const tripId = this.route.snapshot.paramMap.get('id')!;
    this.replayService.getReplay(tripId).subscribe({
      next: (data) => {
        this.replayData = data;
        this.loading = false;
      },
      error: () => this.loading = false,
    });
    this.gpsService.getPoints(tripId).subscribe({
      next: (points) => this.gpsPoints = points,
    });
  }

  trackByTimestamp(_index: number, point: GpsPoint): string {
    return point.timestamp;
  }
}
