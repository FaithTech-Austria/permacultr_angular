import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerConfigStepperComponent } from './layer-config-stepper.component';

describe('LayerConfigStepperComponent', () => {
  let component: LayerConfigStepperComponent;
  let fixture: ComponentFixture<LayerConfigStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayerConfigStepperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayerConfigStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
