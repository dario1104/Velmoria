import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripsService, Trip } from '../services/trips.service';

@Component({
  selector: 'app-trip-form',
  templateUrl: 'trip-form.page.html',
  styleUrls: ['trip-form.page.scss'],
  standalone: false,
})
export class TripFormPage implements OnInit {
  title = '';
  description = '';
  isEditing = false;
  tripId = '';

  constructor(
    private tripsService: TripsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.tripId = id;
      this.tripsService.findOne(id).subscribe(trip => {
        this.title = trip.title;
        this.description = trip.description || '';
      });
    }
  }

  save(): void {
    const obs = this.isEditing
      ? this.tripsService.update(this.tripId, { title: this.title, description: this.description })
      : this.tripsService.create(this.title, this.description || undefined);

    obs.subscribe(() => this.router.navigate(['/trips']));
  }
}
