import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PrivacySettingsPage } from './privacy-settings.page';
import { PrivacySettingsPageRoutingModule } from './privacy-settings-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PrivacySettingsPageRoutingModule],
  declarations: [PrivacySettingsPage],
})
export class PrivacySettingsPageModule {}
