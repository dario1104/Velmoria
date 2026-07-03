import { Component, OnInit } from '@angular/core';
import { AdminService, Report } from '../../services/admin.service';

@Component({
  selector: 'app-moderation',
  templateUrl: 'moderation.page.html',
  styleUrls: ['moderation.page.scss'],
  standalone: false,
})
export class ModerationPage implements OnInit {
  reports: Report[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getReports().subscribe(r => this.reports = r);
  }

  resolve(reportId: string): void {
    this.adminService.resolveReport(reportId).subscribe(() => {
      this.reports = this.reports.filter(r => r.id !== reportId);
    });
  }
}
