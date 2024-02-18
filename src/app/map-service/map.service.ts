import { Injectable } from '@angular/core';
import L from 'leaflet';
import 'leaflet-draw';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map: L.Map = {} as L.Map;
  private editableLayers: L.FeatureGroup = {} as L.FeatureGroup;

  constructor() {
    // Initialize any properties here if necessary
  }

  initializeMap(mapContainerId: string, center: L.LatLngExpression, zoomLevel: number): void {
    this.map = L.map(mapContainerId, {
      center: center,
      zoom: zoomLevel,
      zoomControl: false
    });

    this.addTileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', 19,
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>');

    // Initialize editable layers
    this.initializeEditableLayers();
  }

  private addTileLayer(tileUrl: string, maxZoom: number, attribution: string): void {
    L.tileLayer(tileUrl, {
      maxZoom: maxZoom,
      attribution: attribution
    }).addTo(this.map);
  }

  private initializeEditableLayers(): void {
    this.editableLayers = new L.FeatureGroup();
    this.map.addLayer(this.editableLayers);

    // Setup the 'draw:created' event listener to add the drawn layer to editableLayers
    this.map.on('draw:created', (e) => {
      const { layer } = e;
      this.editableLayers.addLayer(layer);
    });
  }

  public startDrawingPolygon(): void {
    // Assuming we're directly starting polygon drawing here
    const polygonDrawer = new L.Draw.Polygon(this.map as any, {
      shapeOptions: {
        color: '#f377a1', // Example styling, customize as needed
      },
    });
    polygonDrawer.enable();

    // Optionally, handle drawing completion or other events here
  }
}
