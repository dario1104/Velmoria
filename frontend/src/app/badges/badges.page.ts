import { Component, OnInit } from '@angular/core';
import { AchievementsService, Achievement } from '../services/achievements.service';

@Component({
  selector: 'app-badges',
  templateUrl: 'badges.page.html',
  styleUrls: ['badges.page.scss'],
  standalone: false,
})
export class BadgesPage implements OnInit {
  achievements: Achievement[] = [];

  constructor(private achievementsService: AchievementsService) {}

  ngOnInit(): void {
    this.achievementsService.findAll().subscribe(a => this.achievements = a);
  }
}
