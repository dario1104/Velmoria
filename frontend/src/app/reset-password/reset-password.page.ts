import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: 'reset-password.page.html',
  styleUrls: ['reset-password.page.scss'],
  standalone: false,
})
export class ResetPasswordPage implements OnInit {
  token = '';
  password = '';
  confirmPassword = '';
  error = '';
  success = false;
  showPassword = false;
  showConfirmPassword = false;

  private passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const t = this.route.snapshot.queryParamMap.get('token');
    if (!t) {
      this.error = 'Token mancante';
      return;
    }
    this.token = t;
  }

  resetPassword(): void {
    this.error = '';
    if (this.password !== this.confirmPassword) {
      this.error = 'Le password non coincidono';
      return;
    }
    if (!this.passwordRegex.test(this.password)) {
      this.error = 'La password deve avere almeno 8 caratteri, una maiuscola, una minuscola, un numero e un carattere speciale';
      return;
    }
    this.auth.resetPassword(this.token, this.password).subscribe({
      next: () => {
        this.success = true;
      },
      error: (err) => {
        this.error = err.error?.error || 'Errore di connessione';
      },
    });
  }
}
