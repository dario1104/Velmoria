import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: 'edit-profile.page.html',
  styleUrls: ['edit-profile.page.scss'],
  standalone: false,
})
export class EditProfilePage implements OnInit {
  name = '';
  email = '';
  error = '';
  success = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.profile().subscribe({
      next: (user) => {
        this.name = user.name || '';
        this.email = user.email;
      },
      error: (err) => {
        this.error = err.error?.error || 'Errore nel caricamento del profilo';
      },
    });
  }

  save(): void {
    this.error = '';
    this.success = false;
    if (!this.name.trim()) {
      this.error = 'Il nome non può essere vuoto';
      return;
    }
    this.auth.updateProfile({ name: this.name }).subscribe({
      next: () => {
        this.success = true;
      },
      error: (err) => {
        this.error = err.error?.error || 'Errore di connessione';
      },
    });
  }
}
