import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: 'forgot-password.page.html',
  styleUrls: ['forgot-password.page.scss'],
  standalone: false,
})
export class ForgotPasswordPage {
  email = '';
  error = '';
  success = false;

  constructor(private auth: AuthService) {}

  forgotPassword(): void {
    this.error = '';
    this.success = false;
    if (!this.email.trim()) {
      this.error = 'Inserisci la tua email';
      return;
    }
    this.auth.forgotPassword(this.email).subscribe({
      next: () => {
        this.success = true;
      },
      error: (err) => {
        this.error = err.error?.error || 'Errore di connessione';
      },
    });
  }
}
