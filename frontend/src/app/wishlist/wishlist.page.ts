import { Component, OnInit } from '@angular/core';
import { WishlistService, WishlistItem } from '../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: 'wishlist.page.html',
  styleUrls: ['wishlist.page.scss'],
  standalone: false,
})
export class WishlistPage implements OnInit {
  items: WishlistItem[] = [];
  title = '';
  destination = '';
  notes = '';
  showForm = false;

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.wishlistService.findAll().subscribe({
      next: (items) => (this.items = items),
    });
  }

  add(): void {
    if (!this.title.trim()) return;
    this.wishlistService.create(this.title.trim(), this.destination.trim() || undefined, this.notes.trim() || undefined).subscribe({
      next: () => {
        this.title = '';
        this.destination = '';
        this.notes = '';
        this.showForm = false;
        this.load();
      },
    });
  }

  toggle(item: WishlistItem): void {
    this.wishlistService.update(item.id, { completed: !item.completed }).subscribe({
      next: () => this.load(),
    });
  }

  remove(id: string): void {
    this.wishlistService.remove(id).subscribe({
      next: () => this.load(),
    });
  }

  trackByItemId(_index: number, item: WishlistItem): string {
    return item.id;
  }
}
