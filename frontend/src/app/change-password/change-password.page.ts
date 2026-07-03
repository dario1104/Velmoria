import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: 'change-password.page.html',
  styleUrls: ['change-password.page.scss'],
  standalone: false,
})
export class ChangePasswordPage {
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  error = '';
  success = false;
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  private passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  constructor(private auth: AuthService, private router: Router) {}

  changePassword(): void {
    this.error = '';
    this.success = false;
    if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
      this.error = 'Compila tutti i campi';
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Le nuove password non coincidono';
      return;
    }
    if (!this.passwordRegex.test(this.newPassword)) {
      this.error = 'La password deve avere almeno 8 caratteri, una maiuscola, una minuscola, un numero e un carattere speciale';
      return;
    }
    this.auth.changePassword(this.currentPassword, this.newPassword).subscribe({
      next: () => {
        this.success = true;
      },
      error: (err) => {
        this.error = err.error?.error || 'Errore di connessione';
      },
    });
  }
}
