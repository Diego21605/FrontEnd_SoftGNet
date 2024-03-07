/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DriversService } from './Drivers.service';

describe('Service: Drivers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DriversService]
    });
  });

  it('should ...', inject([DriversService], (service: DriversService) => {
    expect(service).toBeTruthy();
  }));
});
