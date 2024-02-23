import { Injectable } from '@angular/core';
import { Project } from '../layer-config-stepper/project-form/Project';

@Injectable({
  providedIn: 'root',
})
export class MapDataService {
  public project: Project = {} as Project;

  constructor() {}

  public setProject(project: Project) {
    this.project = project;
  }
}
