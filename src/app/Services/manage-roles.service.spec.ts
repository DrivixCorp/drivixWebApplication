import { TestBed } from '@angular/core/testing';

import { ManageRolesService } from './manage-roles.service';

describe('ManageRolesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageRolesService = TestBed.get(ManageRolesService);
    expect(service).toBeTruthy();
  });
});
