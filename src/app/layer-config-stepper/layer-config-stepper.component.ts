import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layer-config-stepper',
  standalone: true,
  imports: [MatButton, RouterOutlet],
  templateUrl: './layer-config-stepper.component.html',
  styleUrl: './layer-config-stepper.component.css',
})
export class LayerConfigStepperComponent {
  constructor() {}
}
