import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-verify-2fa',
  templateUrl: 'verify-2fa.page.html',
  styleUrls: ['verify-2fa.page.scss'],
  standalone: false,
})
export class Verify2faPage implements OnInit {
  codice = '';
  error = '';
  email = '';
  userId = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state) {
      this.email = nav.extras.state['email'] || '';
      this.userId = nav.extras.state['userId'] || '';
    }
  }

  verifica(): void {
    this.error = '';
    if (this.codice.length !== 6) {
      this.error = 'Inserisci il codice a 6 cifre';
      return;
    }
    this.auth.verify2fa(this.userId, this.codice).subscribe({
      next: () => this.router.navigate(['/tabs/dashboard']),
      error: (err) => {
        this.error = err.error?.error || 'Codice non valido';
      },
    });
  }
}
