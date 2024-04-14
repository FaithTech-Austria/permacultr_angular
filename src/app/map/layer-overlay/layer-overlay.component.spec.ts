import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerOverlayComponent } from './layer-overlay.component';

describe('LayerOverlayComponent', () => {
  let component: LayerOverlayComponent;
  let fixture: ComponentFixture<LayerOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayerOverlayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayerOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
