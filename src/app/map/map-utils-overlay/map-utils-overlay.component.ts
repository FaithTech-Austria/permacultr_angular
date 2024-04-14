import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatIconButton } from '@angular/material/button';
import { MapService } from '../../map-service/map.service';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField } from '@angular/material/form-field';
import { LayerEnum } from './LayerEnum';
import { BaseMapService } from '../../layer-config-stepper/base-map-config/base-map.service';
import { LayerService } from '../../layer-config-stepper/LayerService';
import { GeoJSON } from 'leaflet';
import { SunMapService } from '../../layer-config-stepper/sun-map-config/sun-map.service';

@Component({
  selector: 'app-map-utils-overlay',
  standalone: true,
  imports: [
    MatIcon,
    MatDivider,
    MatIconButton,
    MatMenuTrigger,
    MatMenu,
    MatCheckbox,
    MatMenuItem,
    MatFormField,
  ],
  templateUrl: './map-utils-overlay.component.html',
  styleUrl: './map-utils-overlay.component.css',
})
export class MapUtilsOverlayComponent implements OnInit {
  selectedPolygon: L.Polygon | null = null;
  protected readonly LayerEnum = LayerEnum;

  constructor(
    private mapService: MapService,
    protected baseMapService: BaseMapService,
    protected sunMapService: SunMapService
  ) {}

  public ngOnInit(): void {
    console.log(this.mapService.editableLayers);
    this.mapService.selectedPolygonObservable.subscribe(
      polygon => (this.selectedPolygon = polygon)
    );
  }

  onLayerSelectionChange(layer: LayerEnum, checked: boolean) {
    switch (layer) {
      case LayerEnum.BaseMap:
        {
          checked
            ? this.showLayer(this.baseMapService)
            : this.hideLayer(this.baseMapService);
        }
        break;
      case LayerEnum.SunMap:
        {
          checked
            ? this.showLayer(this.sunMapService)
            : this.hideLayer(this.sunMapService);
        }
        break;
    }
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

  private showLayer(layerService: LayerService) {
    layerService.showLayer((geoJson?: GeoJSON) =>
      this.mapService.addToMap(geoJson)
    );
  }

  private hideLayer(layerService: LayerService) {
    layerService.hideLayer((geoJson?: GeoJSON) =>
      this.mapService.removeGeojsonFromMap(geoJson)
    );
  }
}
