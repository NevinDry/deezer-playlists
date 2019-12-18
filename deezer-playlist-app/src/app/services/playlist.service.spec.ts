import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { PlaylistService } from './playlist.service';
import { HttpClientModule, HttpRequest } from '@angular/common/http';
import { PlaylistDetailsModel } from '../models/PlaylistDetailsModel';
import { PlaylistHeaderModel } from '../models/PlaylistHeaderModel';
import { PlaylistTrackModel } from '../models/PlaylistTrackModel';
import { environment } from 'src/environments/environment';

describe('PlaylistService creation, http calls tests', () => {
  let service: PlaylistService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [PlaylistService]
    });
    service = TestBed.get(PlaylistService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a list of playlist from Dummy Data', () => {

    const dummyPlaylist = {
      data: [{
        id: 5,
        title: "Pop musicoll",
        picture_medium: "http://slashslahs.fr"
      },
      {
        id: 5,
        title: "Jean Jacque Goldman",
        picture_medium: "http://slashslahs.fr"
      }]
    };

    service.getUserPlaylist().subscribe(items => {
      expect(items.length).toBe(2);
      expect(items[0].id).toEqual(dummyPlaylist.data[0].id);
      expect(items[0].coverLink).toEqual(dummyPlaylist.data[0].picture_medium);
      expect(items[0].title).toEqual(dummyPlaylist.data[0].title);
    });

    const request = httpMock.expectOne(environment.deezerApiUrl + "/user/5/playlists");
    expect(request.request.method).toBe('GET');
    request.flush(dummyPlaylist);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get playlist details from Dummy Data', () => {

    const dummyPlaylistModel = {
      id: 5,
      title: "Pop musicoll",
      picture_medium: "http://slashslahs.fr",
      creator: { name: "Jake" },
      duration: 42
    };

    service.getPlaylistDetails(5).subscribe(item => {
      expect(item).toBeDefined();
      expect(item.id).toEqual(dummyPlaylistModel.id);
      expect(item.coverLink).toEqual(dummyPlaylistModel.picture_medium);
      expect(item.title).toEqual(dummyPlaylistModel.title);
      expect(item.author).toEqual(dummyPlaylistModel.creator.name);
      expect(item.duration).toEqual(dummyPlaylistModel.duration);
    });
    const request = httpMock.expectOne(environment.deezerApiUrl + '/playlist/' + 5);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPlaylistModel);
  });

  it('should get playlist tracks from Dummy Data', () => {
    const dummyPlaylistTrackModel = {
      data: [{
        id: 1,
        title: "HeartBeat",
        artist: { name: "Jake" },
        duration: 42
      },
      {
        id: 2,
        title: "Let there be rock",
        artist: { name: "Angus" },
        duration: 42
      },]
    };

    const playlistId = 5;
    const tracksIndex = 0;
    const trackCount = 2;

    service.getPlaylistTracksFromIndex(5, 0, 2).subscribe(items => {
      expect(items.length).toBe(2);
      expect(items[0].id).toEqual(dummyPlaylistTrackModel.data[0].id);
      expect(items[0].title).toEqual(dummyPlaylistTrackModel.data[0].title);
      expect(items[0].artist).toEqual(dummyPlaylistTrackModel.data[0].artist.name);
      expect(items[0].duration).toEqual(dummyPlaylistTrackModel.data[0].duration);
    });
    const request = httpMock.expectOne(environment.deezerApiUrl + '/playlist/' + playlistId + '/tracks?index=' + tracksIndex + '&limit=' + trackCount);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPlaylistTrackModel);
  });
});

describe('PlaylistService with Deezer API', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
  }));

  it('should get a list of valid playlist from Deezer using user 5', (done) => {
    const service: PlaylistService = TestBed.get(PlaylistService);
    service.getUserPlaylist().subscribe(res => {
      expect(res).toBeDefined();
      expect(res instanceof Array).toBeTruthy();
      expect(res.length).toBeGreaterThan(0);
      expect(res[0] instanceof PlaylistHeaderModel).toBeTruthy();
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
        expect(res instanceof PlaylistDetailsModel).toBeTruthy();
        expect(res.author).toBeDefined();
        expect(res.title).toBeDefined();
        done();
      })
    })
  });

  it('should get playlist tracks from Deezer', (done) => {
    const service: PlaylistService = TestBed.get(PlaylistService);

    service.getUserPlaylist().subscribe(res => {
      const playlistId = res[0].id;
      expect(res).toBeDefined();
      service.getPlaylistDetails(playlistId).subscribe(res => {
        expect(res).toBeDefined();
        service.getPlaylistTracksFromIndex(playlistId, 0, 20).subscribe(res => {
          expect(res).toBeDefined();
          expect(res instanceof Array).toBeTruthy();
          expect(res[0] instanceof PlaylistTrackModel).toBeTruthy();
          expect(res.length).toBeGreaterThan(0);
          done();
        })
      })
    })
  });
});
