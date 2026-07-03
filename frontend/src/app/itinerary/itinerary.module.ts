import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ItineraryPage } from './itinerary.page';
import { ItineraryPageRoutingModule } from './itinerary-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ItineraryPageRoutingModule],
  declarations: [ItineraryPage],
})
export class ItineraryPageModule {}
