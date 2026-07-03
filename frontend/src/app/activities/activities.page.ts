import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimelineService, TimelineEvent } from '../services/timeline.service';

@Component({
  selector: 'app-activities',
  templateUrl: 'activities.page.html',
  styleUrls: ['activities.page.scss'],
  standalone: false,
})
export class ActivitiesPage implements OnInit {
  events: TimelineEvent[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private timelineService: TimelineService,
  ) {}

  ngOnInit(): void {
    const tripId = this.route.snapshot.paramMap.get('id')!;
    this.timelineService.findByTrip(tripId).subscribe({
      next: (data) => {
        this.events = data;
        this.loading = false;
      },
      error: () => this.loading = false,
    });
  }

  trackById(_index: number, event: TimelineEvent): string {
    return event.id;
  }
}
