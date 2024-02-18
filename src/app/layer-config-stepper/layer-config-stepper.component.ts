import {Component, HostBinding} from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatButton} from "@angular/material/button";
import {MapService} from "../map-service/map.service";

@Component({
  selector: 'app-layer-config-stepper',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './layer-config-stepper.component.html',
  styleUrl: './layer-config-stepper.component.css',
})
export class LayerConfigStepperComponent {

  constructor(
    private mapService: MapService
  ) {
  }

  protected doStuf(){
    this.mapService.startDrawingPolygon()
  }
}
