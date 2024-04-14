import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MapDataService } from '../../map-data-service/map-data.service';
import { MapExportService } from '../../map-export-service/map-export.service';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-export-overlay',
  standalone: true,
  imports: [MatIconButton, MatIcon, MatMenu, MatMenuTrigger, MatMenuItem],
  templateUrl: './export-overlay.component.html',
  styleUrl: './export-overlay.component.css',
})
export class ExportOverlayComponent {
  constructor(
    protected mapDataService: MapDataService,
    private mapExportService: MapExportService
  ) {}

  protected exportShape() {
    this.mapExportService.exportToShp();
  }

  protected exportSvg() {
    this.mapExportService.exportToSvg();
  }
}
