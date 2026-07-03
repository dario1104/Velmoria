import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ImportExportPage } from './import-export.page';
import { ImportExportPageRoutingModule } from './import-export-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ImportExportPageRoutingModule],
  declarations: [ImportExportPage],
})
export class ImportExportPageModule {}
