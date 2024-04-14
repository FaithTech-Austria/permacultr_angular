import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MapDataService } from '../map-data-service/map-data.service';
import { BoundingBox } from './BoundingBox';
import { GeoJSON } from 'leaflet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeodataService {
  private baseUrl = 'http://localhost:8080/api/';

  constructor(
    private http: HttpClient,
    private mapService: MapDataService
  ) {}

  getBuildings(): Observable<GeoJSON.GeoJsonObject> {
    const bounds = this.fetchBounds();
    return this.http.post<GeoJSON.GeoJsonObject>(
      `${this.baseUrl}osm/buildings`,
      bounds
    );
  }

  getStreets(): Observable<GeoJSON.GeoJsonObject> {
    const bounds = this.fetchBounds();
    return this.http.post<GeoJSON.GeoJsonObject>(
      `${this.baseUrl}osm/streets`,
      bounds
    );
  }

  getWaterways(): Observable<GeoJSON.GeoJsonObject> {
    const bounds = this.fetchBounds();
    return this.http.post<GeoJSON.GeoJsonObject>(
      `${this.baseUrl}osm/waterways`,
      bounds
    );
  }

  getContour(contourInterval: number): Observable<GeoJSON.GeoJsonObject> {
    console.log(contourInterval);
    const bounds = this.fetchBounds();
    return this.http.post<GeoJSON.GeoJsonObject>(
      `${this.baseUrl}contour_lines`,
      {
        contour_interval: {
          value: contourInterval,
        },
        bb: bounds,
      }
    );
  }

  getSun(dateString: string): Observable<GeoJSON.GeoJsonObject> {
    const bounds = this.fetchBounds();
    return this.http.post<GeoJSON.GeoJsonObject>(
      `${this.baseUrl}solar_potential/?day=${dateString}`,
      bounds
    );
  }

  private fetchBounds() {
    const bounds = this.mapService.project.areaOfInterest.getBounds();
    return {
      min_lat: bounds.getSouth(),
      max_lat: bounds.getNorth(),
      min_lon: bounds.getWest(),
      max_lon: bounds.getEast(),
    } as BoundingBox;
  }
}
