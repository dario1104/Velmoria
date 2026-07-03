import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModerationPage } from './moderation.page';
import { ModerationPageRoutingModule } from './moderation-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ModerationPageRoutingModule],
  declarations: [ModerationPage],
})
export class ModerationPageModule {}
