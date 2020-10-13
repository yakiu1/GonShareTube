import { TestBed } from '@angular/core/testing';

import { YtPlayerService } from './yt-player.service';

describe('YtPlayerService', () => {
  let service: YtPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YtPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
