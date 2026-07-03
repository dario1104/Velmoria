import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TripDetailPage } from './trip-detail.page';
import { TripDetailPageRoutingModule } from './trip-detail-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TripDetailPageRoutingModule],
  declarations: [TripDetailPage],
})
export class TripDetailPageModule {}
