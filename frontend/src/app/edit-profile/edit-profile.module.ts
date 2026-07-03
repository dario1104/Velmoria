import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditProfilePage } from './edit-profile.page';
import { EditProfilePageRoutingModule } from './edit-profile-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, EditProfilePageRoutingModule],
  declarations: [EditProfilePage],
})
export class EditProfilePageModule {}
