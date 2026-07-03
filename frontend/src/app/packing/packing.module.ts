import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PackingPage } from './packing.page';
import { PackingPageRoutingModule } from './packing-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PackingPageRoutingModule],
  declarations: [PackingPage],
})
export class PackingPageModule {}
