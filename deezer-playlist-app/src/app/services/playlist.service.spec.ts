import { TestBed } from '@angular/core/testing';

import { PlaylistService } from './playlist.service';
import { catchError } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';
import { PlaylistDetailsModel } from '../models/PlaylistDetailsModel';

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

  it('should get a list of valid playlist from Deezer', (done) => {
    const service: PlaylistService = TestBed.get(PlaylistService);
    service.getUserPlaylist().subscribe(res => {
      expect(res).toBeDefined();
      expect(res instanceof Array).toBeTruthy();
      expect(res.length).toBeGreaterThan(0);
      expect(res[0] instanceof Object).toBeTruthy();
      expect(res[0].title).toBeDefined();
      expect(res[0].id).toBeDefined();
      expect(res[0].coverLink).toBeDefined();
      done();
    })
  });

  it('should throw an error trying to get playlist from Deezer', (done) => {
    const invalidId = 0;
    const service: PlaylistService = TestBed.get(PlaylistService);
    service.getUserPlaylist(invalidId).subscribe(res => {
     
    }, err => {
      expect(err).toBeDefined();
      expect(err instanceof Error).toBeTruthy();
      done();
    })
  });

  it('should get playlist details from Deezer', (done) => {
    const service: PlaylistService = TestBed.get(PlaylistService);

    service.getUserPlaylist().subscribe(res => {
      expect(res).toBeDefined();
      service.getPlaylistDetails(res[0].id).subscribe(res => {
        expect(res).toBeDefined();
        expect(res instanceof Object).toBeTruthy();
        expect(res.author).toBeDefined();
        expect(res.title).toBeDefined();
        expect(res.tracks instanceof Array).toBeTruthy();

        done();
      })
    })
  });
});
