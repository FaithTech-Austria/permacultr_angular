import { Injectable } from '@angular/core';
import L, { GeoJSON } from 'leaflet';
import 'leaflet-draw';
import 'leaflet-editable';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  public editableLayers!: L.FeatureGroup;
  private map!: L.DrawMap;
  private selectedPolygon$ = new BehaviorSubject<L.Polygon | null>(null);
  public selectedPolygonObservable = this.selectedPolygon$.asObservable();

  private drawingComplete$ = new Subject<L.Layer>();
  public drawingCompleteObservable$ = this.drawingComplete$.asObservable();

  private layerDeleted$ = new Subject<L.Layer>();
  public layerDeletedObservable$ = this.layerDeleted$.asObservable();
  private readonly nonSelectedPolygonStyle = {
    fillOpacity: 0.3,
    opacity: 0.5,
    weight: 5.5,
  };
  private readonly selectedPolygonStyle = {
    fillOpacity: 0.75,
    opacity: 1,
    weight: 7.5,
  };

  public initializeMap(
    mapContainerId: string,
    center: L.LatLngExpression,
    zoomLevel: number
  ): void {
    this.map = L.map(mapContainerId, {
      center,
      zoom: zoomLevel,
      zoomControl: false,
      editable: true,
    });

    this.addTileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', 20, [
      'mt0',
      'mt1',
      'mt2',
      'mt3',
    ]);
    this.initializeEditableLayers();
    this.setupClickEvents();
  }

  public addGeojsonToMap(geojson: GeoJSON.GeoJsonObject) {
    console.log(geojson);
    return new L.GeoJSON(geojson).addTo(this.editableLayers);
  }

  public addToMap(geojson?: GeoJSON) {
    if (geojson) {
      geojson.addTo(this.editableLayers);
    }
  }

  public removeGeojsonFromMap(geojson: GeoJSON | undefined) {
    if (geojson) {
      this.editableLayers.removeLayer(geojson);
    }
  }

  public startDrawingPolygon(): void {
    new L.Draw.Polygon(this.map, {
      shapeOptions: {
        color: '#d5cccc',
        fillOpacity: 0.3,
        opacity: 0.5,
        weight: 5.5,
      },
    }).enable();
  }

  public setSelectedPolygon(polygon: L.Polygon | null): void {
    this.selectedPolygon$.next(polygon);
  }

  public deleteSelectedPolygon(layer: L.Layer) {
    this.setSelectedPolygon(null);
    layer.remove();
    this.layerDeleted$.next(layer);
  }

  private addTileLayer(
    tileUrl: string,
    maxZoom: number,
    subDomains: string[]
  ): void {
    L.tileLayer(tileUrl, {
      maxZoom,
      subdomains: subDomains,
    }).addTo(this.map);
  }

  private initializeEditableLayers(): void {
    this.editableLayers = new L.FeatureGroup().addTo(this.map);

    this.map.on('draw:created', e => {
      this.editableLayers.addLayer(e.layer);
      this.drawingComplete$.next(e.layer);
    });
  }

  private setupClickEvents(): void {
    this.editableLayers.on('click', event => {
      L.DomEvent.stopPropagation(event);
      this.resetSelectedPolygonsStyle();
      this.setSelectedPolygonStyle(event.layer as L.Polygon);
    });

    this.map.on('click', () => this.resetSelectedPolygonsStyle());
  }

  private setSelectedPolygonStyle(polygon: L.Polygon): void {
    polygon.setStyle(this.selectedPolygonStyle);
    this.setSelectedPolygon(polygon);
  }

  private resetSelectedPolygonsStyle(): void {
    this.getSelectedPolygon()?.setStyle(this.nonSelectedPolygonStyle);
    this.getSelectedPolygon()?.disableEdit();
    this.setSelectedPolygon(null);
  }

  private getSelectedPolygon(): L.Polygon | null {
    return this.selectedPolygon$.value;
  }
}
