import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-portal',
  standalone: true,
  imports: [MatButton, RouterLink],
  templateUrl: './project-portal.component.html',
  styleUrl: './project-portal.component.css',
})
export class ProjectPortalComponent {}
