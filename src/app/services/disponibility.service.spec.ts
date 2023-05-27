import { TestBed } from '@angular/core/testing';

import { DisponibilityService } from './disponibility.service';

describe('DisponibilityService', () => {
  let service: DisponibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisponibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
