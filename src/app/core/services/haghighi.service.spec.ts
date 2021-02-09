import { TestBed } from '@angular/core/testing';

import { HaghighiService } from './haghighi.service';

describe('HaghighiService', () => {
  let service: HaghighiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HaghighiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
