import { TestBed } from '@angular/core/testing';

import { HoghoghiService } from './hoghoghi.service';

describe('HoghoghiService', () => {
  let service: HoghoghiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoghoghiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
