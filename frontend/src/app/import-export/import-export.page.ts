import { Component } from '@angular/core';

@Component({
  selector: 'app-import-export',
  templateUrl: 'import-export.page.html',
  styleUrls: ['import-export.page.scss'],
  standalone: false,
})
export class ImportExportPage {
  exportData(): void {
    console.log('Export data');
  }

  importData(): void {
    console.log('Import data');
  }
}
