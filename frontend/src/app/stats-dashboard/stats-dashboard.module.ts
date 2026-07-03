import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StatsDashboardPage } from './stats-dashboard.page';
import { StatsDashboardPageRoutingModule } from './stats-dashboard-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, StatsDashboardPageRoutingModule],
  declarations: [StatsDashboardPage],
})
export class StatsDashboardPageModule {}
