import { Injectable } from '@angular/core';
import { LayerService } from '../LayerService';
import { GeoJSON } from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class SunMapService implements LayerService {
  sunPotential?: GeoJSON;

  constructor() {}

  hideLayer(hideGeoJson: (layer?: GeoJSON) => void): void {
    hideGeoJson(this.sunPotential);
  }

  showLayer(showGeoJson: (layer?: GeoJSON) => void): void {
    showGeoJson(this.sunPotential);
  }

  hasData(): boolean {
    return !!this.sunPotential;
  }
}
