import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  user: { id: string; email: string; name?: string } | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.profile().subscribe(u => this.user = u);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
