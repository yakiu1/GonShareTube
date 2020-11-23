import { TestBed } from '@angular/core/testing';

import { PlaylistInfoService } from './playlist-info.service';

describe('PlaylistInfoService', () => {
  let service: PlaylistInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylistInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
