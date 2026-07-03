import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FollowingPage } from './following.page';
import { FollowingPageRoutingModule } from './following-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FollowingPageRoutingModule
  ],
  declarations: [FollowingPage]
})
export class FollowingPageModule {}
