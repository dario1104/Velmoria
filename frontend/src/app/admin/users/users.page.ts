import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: 'users.page.html',
  styleUrls: ['users.page.scss'],
  standalone: false,
})
export class UsersPage implements OnInit {
  users: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getUsers().subscribe(u => this.users = u);
  }

  changeRole(userId: string, role: string): void {
    this.adminService.updateRole(userId, role).subscribe(() => {
      const u = this.users.find(u => u.id === userId);
      if (u) u.role = role;
    });
  }

  deleteUser(userId: string): void {
    this.adminService.deleteUser(userId).subscribe(() => {
      this.users = this.users.filter(u => u.id !== userId);
    });
  }
}
