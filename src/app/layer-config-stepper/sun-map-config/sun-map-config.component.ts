import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDivider } from '@angular/material/divider';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GeodataService } from '../../geodata-service/geodata.service';
import { MapService } from '../../map-service/map.service';
import { SunMapService } from './sun-map.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import L from 'leaflet';
import Color from 'color';

@Component({
  selector: 'app-sun-map-config',
  standalone: true,
  imports: [
    MatButton,
    MatCheckbox,
    MatDivider,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatDatepickerInput,
    MatInput,
    MatDatepickerToggle,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './sun-map-config.component.html',
  styleUrl: './sun-map-config.component.css',
})
export class SunMapConfigComponent {
  date = new FormControl(new Date());

  constructor(
    private geodataService: GeodataService,
    private mapService: MapService,
    private sunMapService: SunMapService
  ) {}

  loadSunData() {
    const dateString = `${this.date.value?.getFullYear()}-${this.date.value?.getUTCMonth()}-${this.date.value?.getUTCDate()}`;
    this.geodataService.getSun(dateString).subscribe(result => {
      console.log(result);
      console.log(this.sunMapService.sunPotential);
      if (this.sunMapService.sunPotential) {
        this.mapService.removeGeojsonFromMap(this.sunMapService.sunPotential);
      }
      let min: number = 10000;
      let max: number = 0;

      L.geoJSON(result).eachLayer((layer: any) => {
        if (layer.feature.properties.DN > max)
          max = layer.feature.properties.DN;
        if (layer.feature.properties.DN < min)
          min = layer.feature.properties.DN;
      });
      //this.sunMapService.sunPotential = this.mapService.addGeojsonToMap(result);
      this.sunMapService.sunPotential = L.geoJSON(result, {
        style: feature => this.getStyle(feature, min, max),
      }).addTo(this.mapService.editableLayers);

      this.sunMapService.sunPotential.setStyle({
        color: '#d7b96f',
      });
    });
  }

  interpolateColor(dn: number, min: number, max: number): string {
    console.log(dn, min, max);
    const startColor = new Color('#f2de68');
    const endColor = new Color('#fc673a');
    const range = max - min;
    const factor = (dn - min) / range; // Normalize DN value

    const color = startColor.mix(endColor, factor).hex();
    console.log(color);
    return color;
  }

  getStyle(feature: any, min: number, max: number): L.PathOptions {
    return {
      fillColor: this.interpolateColor(feature.properties.DN, min, max),
      color: 'white',
      fillOpacity: 0.625,
    };
  }
}
