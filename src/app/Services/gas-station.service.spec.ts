import { TestBed } from '@angular/core/testing';

import { GasStationService } from './gas-station.service';

describe('GasStationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GasStationService = TestBed.get(GasStationService);
    expect(service).toBeTruthy();
  });
});
