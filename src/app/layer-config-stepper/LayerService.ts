import { GeoJSON } from 'leaflet';

export interface LayerService {
  hideLayer(hideGeoJson: (layer?: GeoJSON) => void): void;

  showLayer(showGeoJson: (layer?: GeoJSON) => void): void;

  hasData(): boolean;
}
