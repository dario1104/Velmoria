import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripsService, Trip } from '../services/trips.service';

@Component({
  selector: 'app-stats-dashboard',
  templateUrl: 'stats-dashboard.page.html',
  styleUrls: ['stats-dashboard.page.scss'],
  standalone: false,
})
export class StatsDashboardPage implements OnInit {
  trip?: Trip;
  stats: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private tripsService: TripsService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.tripsService.findOne(id).subscribe({
      next: (t) => this.trip = t,
    });
    this.tripsService.stats(id).subscribe({
      next: (s) => {
        this.stats = s;
        this.loading = false;
      },
      error: () => this.loading = false,
    });
  }

  trackByKey(_index: number, item: { key: string; value: any }): string {
    return item.key;
  }
}
