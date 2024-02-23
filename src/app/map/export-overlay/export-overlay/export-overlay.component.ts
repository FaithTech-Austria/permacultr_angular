import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MapDataService } from '../../../map-data-service/map-data.service';
import { MapExportService } from '../../../map-export-service/map-export.service';

@Component({
  selector: 'app-export-overlay',
  standalone: true,
  imports: [MatIconButton, MatIcon],
  templateUrl: './export-overlay.component.html',
  styleUrl: './export-overlay.component.css',
})
export class ExportOverlayComponent {
  constructor(
    protected mapDataService: MapDataService,
    private mapExportService: MapExportService
  ) {}

  protected export() {
    this.mapExportService.exportToShp();
  }
}
