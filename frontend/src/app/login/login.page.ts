import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: false,
})
export class LoginPage {
  email = '';
  password = '';
  error = '';
  showPassword = false;

  constructor(private auth: AuthService, private router: Router) {}

  login(): void {
    this.error = '';
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/trips']),
      error: (err) => {
        this.error = err.error?.error || 'Errore di connessione';
      },
    });
  }
}
