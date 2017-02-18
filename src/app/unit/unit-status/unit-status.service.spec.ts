/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UnitStatusService } from './unit-status.service';

describe('UnitStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnitStatusService]
    });
  });

  it('should ...', inject([UnitStatusService], (service: UnitStatusService) => {
    expect(service).toBeTruthy();
  }));
});
