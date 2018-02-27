import { TestBed, inject } from '@angular/core/testing';

import { YouTubeService } from './youtube.service';

describe('YouTubeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YouTubeService]
    });
  });

  it('should be created', inject([YouTubeService], (service: YouTubeService) => {
    expect(service).toBeTruthy();
  }));
});
