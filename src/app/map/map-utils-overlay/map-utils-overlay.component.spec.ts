import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapUtilsOverlayComponent } from './map-utils-overlay.component';

describe('MapUtilsOverlayComponent', () => {
  let component: MapUtilsOverlayComponent;
  let fixture: ComponentFixture<MapUtilsOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapUtilsOverlayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MapUtilsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
