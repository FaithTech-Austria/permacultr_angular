import { Injectable } from '@angular/core';
import { MapService } from '../map-service/map.service';

import shpwrite from '@mapbox/shp-write';
import { MapDataService } from '../map-data-service/map-data.service';
import { GeoJSON2SVG } from 'geojson2svg';

@Injectable({
  providedIn: 'root',
})
export class MapExportService {
  constructor(
    private mapService: MapService,
    private mapDataService: MapDataService
  ) {}

  public exportToSvg() {
    const options = {
      mapExtentFromGeojson: true,
    };
    const converter = new GeoJSON2SVG(options);

    const svgStrings = converter.convert(
      this.mapService.editableLayers.toGeoJSON() as {
        type: 'FeatureCollection';
        features: never[];
      }
    );
    const svgData = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linejoin="round" stroke-linecap="round" stroke-width="1" stroke="#000000">
    ${svgStrings}
  </svg>`;
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'permacultr_svg.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

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
