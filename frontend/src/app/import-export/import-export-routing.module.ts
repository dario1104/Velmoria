import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportExportPage } from './import-export.page';

const routes: Routes = [{ path: '', component: ImportExportPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportExportPageRoutingModule {}
