import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  stats: any = {};
  users: any[] = [];

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.adminService.getStats().subscribe(s => this.stats = s);
    this.adminService.getUsers().subscribe(u => this.users = u);
  }

  goToUsers(): void {
    this.router.navigate(['/admin/users']);
  }
}
