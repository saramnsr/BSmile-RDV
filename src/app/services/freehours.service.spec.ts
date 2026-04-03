import { TestBed } from '@angular/core/testing';

import { FreehoursService } from './freehours.service';

describe('FreehoursService', () => {
  let service: FreehoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreehoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
