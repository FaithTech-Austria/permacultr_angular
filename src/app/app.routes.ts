import { Routes } from '@angular/router';
import { ProjectPortalComponent } from './layer-config-stepper/project-portal/project-portal.component';
import { ProjectFormComponent } from './layer-config-stepper/project-form/project-form.component';

export const routes: Routes = [
  { path: 'start', component: ProjectPortalComponent },
  { path: 'create-project', component: ProjectFormComponent },
  { path: '', redirectTo: 'start', pathMatch: 'full' },
];
