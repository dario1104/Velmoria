import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PackingService, PackingItem } from '../services/packing.service';

@Component({
  selector: 'app-packing',
  templateUrl: 'packing.page.html',
  styleUrls: ['packing.page.scss'],
  standalone: false,
})
export class PackingPage implements OnInit {
  items: PackingItem[] = [];
  loading = true;
  showForm = false;
  formItem = '';
  formQuantity: number | null = null;
  formCategory = '';

  constructor(
    private route: ActivatedRoute,
    private packingService: PackingService,
  ) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    const tripId = this.route.snapshot.paramMap.get('id')!;
    this.loading = true;
    this.packingService.findByTrip(tripId).subscribe({
      next: (data) => {
        this.items = data;
        this.loading = false;
      },
      error: () => this.loading = false,
    });
  }

  openAdd(): void {
    this.formItem = '';
    this.formQuantity = null;
    this.formCategory = '';
    this.showForm = true;
  }

  cancelForm(): void {
    this.showForm = false;
  }

  saveItem(): void {
    const tripId = this.route.snapshot.paramMap.get('id')!;
    this.packingService.create(tripId, this.formItem, this.formQuantity || undefined, this.formCategory).subscribe({
      next: () => {
        this.showForm = false;
        this.loadItems();
      },
    });
  }

  togglePacked(item: PackingItem): void {
    this.packingService.update(item.id, { packed: !item.packed }).subscribe({
      next: () => this.loadItems(),
    });
  }

  deleteItem(id: string): void {
    this.packingService.remove(id).subscribe({
      next: () => this.loadItems(),
    });
  }

  trackById(_index: number, item: PackingItem): string {
    return item.id;
  }
}
