import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SunMapConfigComponent } from './sun-map-config.component';

describe('SunMapConfigComponent', () => {
  let component: SunMapConfigComponent;
  let fixture: ComponentFixture<SunMapConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SunMapConfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SunMapConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
