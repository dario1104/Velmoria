import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoiService, PointOfInterest } from '../services/poi.service';
import { ReviewsService, Review } from '../services/reviews.service';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: 'place-detail.page.html',
  styleUrls: ['place-detail.page.scss'],
  standalone: false,
})
export class PlaceDetailPage implements OnInit {
  poi: PointOfInterest | null = null;
  reviews: Review[] = [];

  constructor(
    private route: ActivatedRoute,
    private poiService: PoiService,
    private reviewsService: ReviewsService,
    private favoritesService: FavoritesService,
  ) {}

  ngOnInit(): void {
    const poiId = this.route.snapshot.paramMap.get('poiId')!;
    this.poiService.findOne(poiId).subscribe({
      next: (p) => (this.poi = p),
    });
    this.reviewsService.findByPlace(poiId).subscribe({
      next: (r) => (this.reviews = r),
    });
  }

  addToFavorites(): void {
    if (!this.poi) return;
    this.favoritesService.create(this.poi.id).subscribe();
  }

  trackByReviewId(_index: number, r: Review): string {
    return r.id;
  }
}
