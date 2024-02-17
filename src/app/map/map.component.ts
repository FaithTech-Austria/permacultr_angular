import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import L from "leaflet";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit{
  constructor(
  ) { }


  public ngAfterViewInit() {
    const map = L.map('map', {
      center: [ -6.1309975, 35.954609 ],
      zoom: 17,
      zoomControl: false
    });

    const streetViewTile = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
    streetViewTile.addTo(map)

/*    const googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3']
    });
    googleSat.addTo(map)*/
  }
}
