import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlaceDetailPage } from './place-detail.page';
import { PlaceDetailPageRoutingModule } from './place-detail-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PlaceDetailPageRoutingModule],
  declarations: [PlaceDetailPage],
})
export class PlaceDetailPageModule {}
