import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeviceManagementPage } from './device-management.page';

const routes: Routes = [{ path: '', component: DeviceManagementPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceManagementPageRoutingModule {}
