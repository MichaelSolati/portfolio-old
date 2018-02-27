import { TestBed, async, inject } from '@angular/core/testing';

import { CodeGuard } from './code.guard';

describe('CodeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodeGuard]
    });
  });

  it('should ...', inject([CodeGuard], (guard: CodeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
