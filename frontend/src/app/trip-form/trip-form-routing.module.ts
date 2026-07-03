import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripFormPage } from './trip-form.page';

const routes: Routes = [{ path: '', component: TripFormPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripFormPageRoutingModule {}
