import { TestBed } from '@angular/core/testing';

import { SanadrahnigheyrmangholService } from './sanadrahnigheyrmanghol.service';

describe('SanadrahnigheyrmangholService', () => {
  let service: SanadrahnigheyrmangholService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SanadrahnigheyrmangholService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
