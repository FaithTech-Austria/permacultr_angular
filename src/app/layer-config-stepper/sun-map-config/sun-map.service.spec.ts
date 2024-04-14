import { TestBed } from '@angular/core/testing';

import { SunMapService } from './sun-map.service';

describe('SunMapService', () => {
  let service: SunMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SunMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
