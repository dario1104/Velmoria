import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TripFormPage } from './trip-form.page';
import { TripFormPageRoutingModule } from './trip-form-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TripFormPageRoutingModule],
  declarations: [TripFormPage],
})
export class TripFormPageModule {}
