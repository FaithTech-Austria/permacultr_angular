import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseMapConfigComponent } from './base-map-config.component';

describe('BaseMapConfigComponent', () => {
  let component: BaseMapConfigComponent;
  let fixture: ComponentFixture<BaseMapConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseMapConfigComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseMapConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
