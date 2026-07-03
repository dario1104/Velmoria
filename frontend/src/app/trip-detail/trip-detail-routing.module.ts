import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripDetailPage } from './trip-detail.page';

const routes: Routes = [{ path: '', component: TripDetailPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripDetailPageRoutingModule {}
