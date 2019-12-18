import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { PlaylistDetailsModel } from '../models/PlaylistDetailsModel';
import { Observable, throwError } from 'rxjs';
import { PlaylistService } from '../services/playlist.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { catchError, switchMap, tap, map } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { PlaylistTrackModel } from '../models/PlaylistTrackModel';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss']
})
export class PlaylistDetailComponent implements OnInit {

  public playlist$: Observable<PlaylistDetailsModel>;
  public error: Error = null;
  public playlistId: number;

  public isFetchingTracks = false;
  public tracksIndex = 0;
  public scrollCallback: any;
  public tracks: PlaylistTrackModel[] = [];
  public indexCount: number = 0;
  private trackCount: number = 30;

  constructor(private playlistService: PlaylistService, private route: ActivatedRoute, @Inject(DOCUMENT) document) {
    this.scrollCallback = this.fetchingNewTracks.bind(this);
   }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.playlistId = +params.get('id');
      this.playlist$ = this.playlistService.getPlaylistDetails(this.playlistId).pipe(
        catchError((err: Error) => {
          this.error = err;
          return throwError(err);
        })
      )
    });
  }

  fetchingNewTracks() {
    this.isFetchingTracks = true;
    return this.playlistService.getPlaylistTracksFromIndex(this.playlistId, this.indexCount, this.trackCount).pipe(tap(newTracks => {
      this.tracks = this.tracks.concat(newTracks);
      this.indexCount += this.trackCount;
      this.isFetchingTracks = false;
    }));
  }

}
