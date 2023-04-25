import { TestBed } from '@angular/core/testing';

import { FlightsByOriginService } from './flights-by-origin.service';

describe('FlightsByOriginService', () => {
  let service: FlightsByOriginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightsByOriginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
