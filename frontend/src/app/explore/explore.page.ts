import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { PoiService, PointOfInterest } from '../services/poi.service';

@Component({
  selector: 'app-explore',
  templateUrl: 'explore.page.html',
  styleUrls: ['explore.page.scss'],
  standalone: false,
})
export class ExplorePage implements OnInit {
  query = '';
  featuredPois: PointOfInterest[] = [];
  trendingPois: PointOfInterest[] = [];
  searchResults: PointOfInterest[] | null = null;

  constructor(
    private searchService: SearchService,
    private poiService: PoiService,
  ) {}

  ngOnInit(): void {
    this.poiService.findAll().subscribe({
      next: (pois) => {
        this.featuredPois = pois;
        this.trendingPois = pois.slice(0, 5);
      },
    });
  }

  onSearch(): void {
    const q = this.query.trim();
    if (!q) {
      this.searchResults = null;
      return;
    }
    this.poiService.search(q).subscribe({
      next: (results) => (this.searchResults = results),
    });
  }

  trackByPoiId(_index: number, poi: PointOfInterest): string {
    return poi.id;
  }
}
