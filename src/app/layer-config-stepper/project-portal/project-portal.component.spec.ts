import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPortalComponent } from './project-portal.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProjectPortalComponent', () => {
  let component: ProjectPortalComponent;
  let fixture: ComponentFixture<ProjectPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectPortalComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
