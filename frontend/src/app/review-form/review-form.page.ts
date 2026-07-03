import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewsService } from '../services/reviews.service';

@Component({
  selector: 'app-review-form',
  templateUrl: 'review-form.page.html',
  styleUrls: ['review-form.page.scss'],
  standalone: false,
})
export class ReviewFormPage implements OnInit {
  poiId: string;
  rating = 0;
  comment = '';
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewsService: ReviewsService,
  ) {
    this.poiId = this.route.snapshot.paramMap.get('poiId')!;
  }

  ngOnInit(): void {
    this.poiId = this.route.snapshot.paramMap.get('poiId')!;
  }

  setRating(value: number): void {
    this.rating = value;
  }

  submit(): void {
    if (this.rating === 0) return;
    this.reviewsService.create(this.poiId, this.rating, this.comment || undefined).subscribe({
      next: () => {
        this.submitted = true;
        this.router.navigate(['/place-detail', this.poiId]);
      },
    });
  }
}
