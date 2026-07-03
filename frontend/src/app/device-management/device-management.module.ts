import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DeviceManagementPage } from './device-management.page';
import { DeviceManagementPageRoutingModule } from './device-management-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, DeviceManagementPageRoutingModule],
  declarations: [DeviceManagementPage],
})
export class DeviceManagementPageModule {}
