import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressOverlayComponent } from './progress-overlay.component';

describe('ProgressOverlayComponent', () => {
  let component: ProgressOverlayComponent;
  let fixture: ComponentFixture<ProgressOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressOverlayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgressOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
