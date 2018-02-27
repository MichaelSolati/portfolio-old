import { TestBed, async, inject } from '@angular/core/testing';

import { ArticlesGuard } from './articles.guard';

describe('ArticlesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticlesGuard]
    });
  });

  it('should ...', inject([ArticlesGuard], (guard: ArticlesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
