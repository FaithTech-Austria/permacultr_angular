import { Routes } from '@angular/router';
import { ProjectPortalComponent } from './layer-config-stepper/project-portal/project-portal.component';
import { ProjectFormComponent } from './layer-config-stepper/project-form/project-form.component';
import { BaseMapConfigComponent } from './layer-config-stepper/base-map-config/base-map-config/base-map-config.component';

export const routes: Routes = [
  { path: 'start', component: ProjectPortalComponent },
  { path: 'create-project', component: ProjectFormComponent },
  { path: 'base-map', component: BaseMapConfigComponent },
  { path: '', redirectTo: 'start', pathMatch: 'full' },
];
