import { TestBed } from '@angular/core/testing';

import { JqueryCallingService } from './jquery-calling.service';

describe('JqueryCallingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JqueryCallingService = TestBed.get(JqueryCallingService);
    expect(service).toBeTruthy();
  });
});
