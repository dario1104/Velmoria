import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FollowersPage } from './followers.page';
import { FollowersPageRoutingModule } from './followers-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FollowersPageRoutingModule
  ],
  declarations: [FollowersPage]
})
export class FollowersPageModule {}
