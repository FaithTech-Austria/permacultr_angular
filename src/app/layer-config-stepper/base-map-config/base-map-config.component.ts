import { Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';
import { GeodataService } from '../../geodata-service/geodata.service';
import { MapService } from '../../map-service/map.service';
import { BaseMapService } from './base-map.service';
import { RouterLink } from '@angular/router';
import { MatInput } from '@angular/material/input';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';

@Component({
  selector: 'app-base-map-config',
  standalone: true,
  imports: [
    MatDivider,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckbox,
    MatButton,
    RouterLink,
    MatInput,
    MatSlider,
    MatSliderThumb,
    FormsModule,
  ],
  templateUrl: './base-map-config.component.html',
  styleUrl: './base-map-config.component.css',
})
export class BaseMapConfigComponent {
  contourLineDistance: number = 1;
  protected baseMapForm = this.buildForm();

  constructor(
    private geodataService: GeodataService,
    private mapService: MapService,
    private baseMapService: BaseMapService
  ) {}

  onSubmit() {
    this.cleanupBaseMap();
    if (this.baseMapForm.controls.buildings.value) {
      this.geodataService.getBuildings().subscribe(geojson => {
        this.baseMapService.buildings =
          this.mapService.addGeojsonToMap(geojson);
        this.baseMapService.buildings.setStyle({
          color: '#f0ede9',
          fillOpacity: 0.75,
        });
      });
    }

    if (this.baseMapForm.controls.streets.value) {
      this.geodataService.getStreets().subscribe(geojson => {
        console.log(geojson);
        this.baseMapService.streets = this.mapService.addGeojsonToMap(geojson);
        this.baseMapService.streets.setStyle({
          color: '#a3a4a4',
        });
      });
    }

    if (this.baseMapForm.controls.water.value) {
      this.geodataService.getWaterways().subscribe(geojson => {
        console.log(geojson);
        this.baseMapService.waterways =
          this.mapService.addGeojsonToMap(geojson);
        this.baseMapService.waterways.setStyle({
          color: '#163ddb',
        });
      });
    }

    if (this.baseMapForm.controls.contour.value) {
      this.geodataService
        .getContour(this.contourLineDistance)
        .subscribe(geojson => {
          console.log(geojson);
          this.baseMapService.contour =
            this.mapService.addGeojsonToMap(geojson);
          this.baseMapService.contour.setStyle({
            color: '#6b4719',
          });
        });
    }
  }

  onChange(value: number) {
    this.contourLineDistance = value;
  }

  private buildForm() {
    return new FormGroup({
      buildings: new FormControl(false),
      streets: new FormControl(false),
      water: new FormControl(false),
      contour: new FormControl(false),
    });
  }

  private cleanupBaseMap() {
    if (this.baseMapService.buildings) {
      this.mapService.removeGeojsonFromMap(this.baseMapService.buildings);
    }
    if (this.baseMapService.streets) {
      this.mapService.removeGeojsonFromMap(this.baseMapService.streets);
    }
    if (this.baseMapService.waterways) {
      this.mapService.removeGeojsonFromMap(this.baseMapService.waterways);
    }
    if (this.baseMapService.contour) {
      this.mapService.removeGeojsonFromMap(this.baseMapService.contour);
    }
  }
}
