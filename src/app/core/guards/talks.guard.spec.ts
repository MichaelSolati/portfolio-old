import { TestBed, async, inject } from '@angular/core/testing';

import { TalksGuard } from './talks.guard';

describe('TalksGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TalksGuard]
    });
  });

  it('should ...', inject([TalksGuard], (guard: TalksGuard) => {
    expect(guard).toBeTruthy();
  }));
});
