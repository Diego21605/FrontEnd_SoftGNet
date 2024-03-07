/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VehiculesService } from './Vehicules.service';

describe('Service: Vehicules', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehiculesService]
    });
  });

  it('should ...', inject([VehiculesService], (service: VehiculesService) => {
    expect(service).toBeTruthy();
  }));
});
