import { Routes } from '@angular/router';
import { ProjectPortalComponent } from './layer-config-stepper/project-portal/project-portal.component';
import { ProjectFormComponent } from './layer-config-stepper/project-form/project-form.component';
import { BaseMapConfigComponent } from './layer-config-stepper/base-map-config/base-map-config.component';
import { SunMapConfigComponent } from './layer-config-stepper/sun-map-config/sun-map-config.component';

export const routes: Routes = [
  { path: 'start', component: ProjectPortalComponent },
  { path: 'create-project', component: ProjectFormComponent },
  { path: 'base-map', component: BaseMapConfigComponent },
  { path: 'sun-map', component: SunMapConfigComponent },
  { path: '', redirectTo: 'start', pathMatch: 'full' },
];
