import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  error = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(private auth: AuthService, private router: Router) {}

  private passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  register(): void {
    this.error = '';
    if (!this.name.trim()) {
      this.error = 'Il nome è obbligatorio';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.error = 'Le password non coincidono';
      return;
    }
    if (!this.passwordRegex.test(this.password)) {
      this.error = 'La password deve avere almeno 8 caratteri, una maiuscola, una minuscola, un numero e un carattere speciale';
      return;
    }
    this.auth.register(this.email, this.password, this.name).subscribe({
      next: () => this.router.navigate(['/trips']),
      error: (err) => {
        this.error = err.error?.error || 'Errore di connessione';
      },
    });
  }
}
