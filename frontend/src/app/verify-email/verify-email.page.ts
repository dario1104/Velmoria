import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: 'verify-email.page.html',
  styleUrls: ['verify-email.page.scss'],
  standalone: false,
})
export class VerifyEmailPage implements OnInit {
  loading = true;
  success = false;
  error = '';

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      this.loading = false;
      this.error = 'Token mancante';
      return;
    }
    this.auth.verifyEmail(token).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.error || 'Errore di verifica';
      },
    });
  }
}
