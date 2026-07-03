import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiaryService, DiaryEntry } from '../services/diary.service';

@Component({
  selector: 'app-itinerary',
  templateUrl: 'itinerary.page.html',
  styleUrls: ['itinerary.page.scss'],
  standalone: false,
})
export class ItineraryPage implements OnInit {
  entries: DiaryEntry[] = [];
  loading = true;
  showForm = false;
  editingId: string | null = null;
  formDate = '';
  formTitle = '';
  formContent = '';
  formMood = '';
  formWeather = '';

  constructor(
    private route: ActivatedRoute,
    private diaryService: DiaryService,
  ) {}

  ngOnInit(): void {
    const tripId = this.route.snapshot.paramMap.get('id')!;
    this.loadEntries(tripId);
  }

  loadEntries(tripId: string): void {
    this.loading = true;
    this.diaryService.findByTrip(tripId).subscribe({
      next: (data) => {
        this.entries = data;
        this.loading = false;
      },
      error: () => this.loading = false,
    });
  }

  tripId(): string {
    return this.route.snapshot.paramMap.get('id')!;
  }

  openAdd(): void {
    this.editingId = null;
    this.formDate = '';
    this.formTitle = '';
    this.formContent = '';
    this.formMood = '';
    this.formWeather = '';
    this.showForm = true;
  }

  openEdit(entry: DiaryEntry): void {
    this.editingId = entry.id;
    this.formDate = entry.date;
    this.formTitle = entry.title || '';
    this.formContent = entry.content || '';
    this.formMood = entry.mood || '';
    this.formWeather = entry.weather || '';
    this.showForm = true;
  }

  cancelForm(): void {
    this.showForm = false;
    this.editingId = null;
  }

  saveEntry(): void {
    const tripId = this.tripId();
    const data: Partial<DiaryEntry> = {
      date: this.formDate,
      title: this.formTitle,
      content: this.formContent,
      mood: this.formMood,
      weather: this.formWeather,
    };
    if (this.editingId) {
      this.diaryService.update(this.editingId, data).subscribe({
        next: () => {
          this.showForm = false;
          this.editingId = null;
          this.loadEntries(tripId);
        },
      });
    } else {
      this.diaryService.create({ ...data, tripId }).subscribe({
        next: () => {
          this.showForm = false;
          this.loadEntries(tripId);
        },
      });
    }
  }

  deleteEntry(id: string): void {
    this.diaryService.remove(id).subscribe({
      next: () => this.loadEntries(this.tripId()),
    });
  }

  trackById(_index: number, entry: DiaryEntry): string {
    return entry.id;
  }
}
