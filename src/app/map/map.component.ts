import { AfterViewInit, Component } from '@angular/core';
import { MapService } from '../map-service/map.service';
import { MatButton } from '@angular/material/button';
import { MapUtilsOverlayComponent } from './map-utils-overlay/map-utils-overlay.component';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [MatButton, MapUtilsOverlayComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements AfterViewInit {
  constructor(protected mapService: MapService) {}

  public ngAfterViewInit() {
    this.mapService.initializeMap('map', [-6.1309975, 35.954609], 17);
  }
}

// TODO Create Project => Name, Description, Polygon => areaOfInterest
// TODO BaseLayer:
// TODO
// TODO
// TODO
