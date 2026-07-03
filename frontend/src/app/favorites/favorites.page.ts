import { Component, OnInit } from '@angular/core';
import { FavoritesService, Favorite } from '../services/favorites.service';
import { PoiService, PointOfInterest } from '../services/poi.service';

@Component({
  selector: 'app-favorites',
  templateUrl: 'favorites.page.html',
  styleUrls: ['favorites.page.scss'],
  standalone: false,
})
export class FavoritesPage implements OnInit {
  favorites: (Favorite & { poi?: PointOfInterest })[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private poiService: PoiService,
  ) {}

  ngOnInit(): void {
    this.favoritesService.findAll().subscribe({
      next: (favs) => {
        favs.forEach((fav) => {
          this.poiService.findOne(fav.poiId).subscribe({
            next: (poi) => this.favorites.push({ ...fav, poi }),
          });
        });
      },
    });
  }

  remove(poiId: string): void {
    this.favoritesService.remove(poiId).subscribe({
      next: () => {
        this.favorites = this.favorites.filter((f) => f.poiId !== poiId);
      },
    });
  }

  trackByFavoriteId(_index: number, fav: Favorite & { poi?: PointOfInterest }): string {
    return fav.id;
  }
}
