import { Injectable } from '@angular/core';
import { GeoJSON } from 'leaflet';
import { LayerService } from '../LayerService';

@Injectable({
  providedIn: 'root',
})
export class BaseMapService implements LayerService {
  streets?: GeoJSON;
  buildings?: GeoJSON;
  waterways?: GeoJSON;
  contour?: GeoJSON;

  constructor() {}

  hideLayer(hideGeoJson: (layer?: GeoJSON) => void): void {
    hideGeoJson(this.streets);
    hideGeoJson(this.buildings);
    hideGeoJson(this.waterways);
    hideGeoJson(this.contour);
  }

  showLayer(showGeoJson: (layer?: GeoJSON) => void): void {
    showGeoJson(this.streets);
    showGeoJson(this.buildings);
    showGeoJson(this.waterways);
    showGeoJson(this.contour);
  }

  hasData(): boolean {
    return (
      !!this.streets || !!this.buildings || !!this.waterways || !!this.contour
    );
  }
}
