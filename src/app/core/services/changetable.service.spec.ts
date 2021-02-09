import { TestBed } from '@angular/core/testing';

import { ChangetableService } from './changetable.service';

describe('ChangetableService', () => {
  let service: ChangetableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangetableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
