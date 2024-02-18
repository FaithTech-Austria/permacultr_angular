import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import L, {marker} from "leaflet";
import {MapService} from "../map-service/map.service";
import {MatButton} from "@angular/material/button";
import {MapUtilsOverlayComponent} from "./map-utils-overlay/map-utils-overlay.component";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    MatButton,
    MapUtilsOverlayComponent
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit{
  constructor(
    private mapService: MapService
  ) { }


  public ngAfterViewInit() {

    this.mapService.initializeMap('map', [ -6.1309975, 35.954609 ], 17)



/*    const googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3']
    });
    googleSat.addTo(map)*/
  }

  doStuff() {
    this.mapService.startDrawingPolygon()
  }
}
