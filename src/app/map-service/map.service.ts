import { Injectable } from '@angular/core';
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet-editable';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map!: L.DrawMap;
  public editableLayers!: L.FeatureGroup;
  private selectedPolygon$ = new BehaviorSubject<L.Polygon | null>(null);
  public selectedPolygonObservable = this.selectedPolygon$.asObservable();

  private drawingComplete$ = new Subject<L.Layer>();
  public drawingCompleteObservable$ = this.drawingComplete$.asObservable();

  private layerDeleted$ = new Subject<L.Layer>();
  public layerDeletedObservable$ = this.layerDeleted$.asObservable();

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

  public startDrawingPolygon(): void {
    const color = `#${(0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)}`;
    new L.Draw.Polygon(this.map, {
      shapeOptions: {
        color,
        fillOpacity: 0.3,
        opacity: 0.5,
        weight: 5.5,
      },
    }).enable();
  }

  public setSelectedPolygon(polygon: L.Polygon | null): void {
    this.selectedPolygon$.next(polygon);
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

  public deleteSelectedPolygon(layer: L.Layer) {
    this.setSelectedPolygon(null);
    layer.remove();
    this.layerDeleted$.next(layer);
  }
}
