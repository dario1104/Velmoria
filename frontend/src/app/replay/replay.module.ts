import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReplayPage } from './replay.page';
import { ReplayPageRoutingModule } from './replay-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReplayPageRoutingModule],
  declarations: [ReplayPage],
})
export class ReplayPageModule {}
