import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatIconButton } from '@angular/material/button';
import { MapService } from '../../map-service/map.service';

@Component({
  selector: 'app-map-utils-overlay',
  standalone: true,
  imports: [MatIcon, MatDivider, MatIconButton],
  templateUrl: './map-utils-overlay.component.html',
  styleUrl: './map-utils-overlay.component.css',
})
export class MapUtilsOverlayComponent implements OnInit {
  selectedPolygon: L.Polygon | null = null;

  constructor(private mapService: MapService) {}

  public ngOnInit(): void {
    this.mapService.selectedPolygonObservable.subscribe(
      polygon => (this.selectedPolygon = polygon)
    );
  }

  protected togglePolygonEditability(editEnabled: boolean) {
    if (editEnabled) {
      this.selectedPolygon!.disableEdit();
    } else {
      this.selectedPolygon!.enableEdit();
    }
  }

  protected deletePolygon() {
    this.mapService.deleteSelectedPolygon(this.selectedPolygon!);
  }
}
