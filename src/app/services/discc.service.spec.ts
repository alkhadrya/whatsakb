import { TestBed } from '@angular/core/testing';

import { DisccService } from './discc.service';

describe('DisccService', () => {
  let service: DisccService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisccService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
