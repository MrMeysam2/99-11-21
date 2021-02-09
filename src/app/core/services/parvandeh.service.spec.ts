import { TestBed } from '@angular/core/testing';

import { ParvandehService } from './parvandeh.service';

describe('ParvandehService', () => {
  let service: ParvandehService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParvandehService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
