import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModerationPage } from './moderation.page';

const routes: Routes = [{ path: '', component: ModerationPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModerationPageRoutingModule {}
