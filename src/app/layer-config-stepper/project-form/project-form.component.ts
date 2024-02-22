import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatDivider } from '@angular/material/divider';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MapService } from '../../map-service/map.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInput,
    CdkTextareaAutosize,
    MatDivider,
    MatButton,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css',
})
export class ProjectFormComponent implements OnInit {
  protected projectForm = this.buildForm();
  protected isDrawing = false;
  protected layer: L.Polygon | null = null;

  constructor(protected mapService: MapService) {}

  public ngOnInit(): void {
    this.mapService.drawingCompleteObservable$.subscribe(layer => {
      this.layer = layer as L.Polygon;
      this.isDrawing = false;
    });

    this.mapService.layerDeletedObservable$.subscribe(layer => {
      if (layer == this.layer) {
        this.layer = null;
      }
    });
  }

  private buildForm() {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
    });
  }

  protected drawPolygon() {
    this.isDrawing = true;
    this.mapService.startDrawingPolygon();
  }

  protected onSubmit() {
    if (this.projectForm.valid) {
      //TODO Build Project Model
    }
  }
}
