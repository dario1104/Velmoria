import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivitiesPage } from './activities.page';
import { ActivitiesPageRoutingModule } from './activities-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ActivitiesPageRoutingModule],
  declarations: [ActivitiesPage],
})
export class ActivitiesPageModule {}
