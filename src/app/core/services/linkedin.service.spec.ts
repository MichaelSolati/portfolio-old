import { TestBed, inject } from '@angular/core/testing';

import { LinkedInService } from './linkedin.service';

describe('LinkedInService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LinkedInService]
    });
  });

  it('should be created', inject([LinkedInService], (service: LinkedInService) => {
    expect(service).toBeTruthy();
  }));
});
