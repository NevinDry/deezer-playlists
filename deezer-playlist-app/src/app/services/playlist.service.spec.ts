import { TestBed } from '@angular/core/testing';

import { PlaylistService } from './playlist.service';
import { PlaylistHeaderModel } from '../models/PlaylistHeaderModel';
import { catchError } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';

describe('PlaylistService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
  }));

  it('should be created', () => {
    const service: PlaylistService = TestBed.get(PlaylistService);
    expect(service).toBeTruthy();
  });

  it('should get a list of valid playlist from Deezer', () => {
    const service: PlaylistService = TestBed.get(PlaylistService);
    service.getUserPlaylist().subscribe(res => {
      expect(res).toBeDefined();
      expect(res.length).toBeGreaterThan(0);
      expect(res[0] instanceof PlaylistHeaderModel).toBeTruthy();
    })
  });

  it('should throw an error trying to get playlist from Deezer', () => {
    const invalidId = 0;
    const service: PlaylistService = TestBed.get(PlaylistService);
    service.getUserPlaylist(invalidId).pipe(catchError(res => {
      expect(res).toBeDefined();
      expect(res instanceof Error).toBeTruthy();
      return null;
    }))
  });
});
