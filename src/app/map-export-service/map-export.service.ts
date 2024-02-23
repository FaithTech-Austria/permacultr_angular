import { Injectable } from '@angular/core';
import { MapService } from '../map-service/map.service';

import shpwrite from '@mapbox/shp-write';
import { MapDataService } from '../map-data-service/map-data.service';

@Injectable({
  providedIn: 'root',
})
export class MapExportService {
  constructor(
    private mapService: MapService,
    private mapDataService: MapDataService
  ) {}

  public exportToShp() {
    const options = {
      folder: 'permacultr_shapes',
      filename: 'permacultr_shapes_zipped',
      outputType: 'blob',
      compression: 'DEFLATE',
      types: {
        point: 'mypoints',
        polygon: 'mypolygons',
        polyline: 'mylines',
      },
    };
    shpwrite.download(
      this.mapService.editableLayers.toGeoJSON() as {
        type: 'FeatureCollection';
        features: never[];
      },
      options as never
    );
  }
}
