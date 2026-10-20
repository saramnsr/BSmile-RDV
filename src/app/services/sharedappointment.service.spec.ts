import { TestBed } from '@angular/core/testing';

import { SharedappointmentService } from './sharedappointment.service';

describe('SharedappointmentService', () => {
  let service: SharedappointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedappointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
