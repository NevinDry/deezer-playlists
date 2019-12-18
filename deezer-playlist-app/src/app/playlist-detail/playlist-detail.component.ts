import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { PlaylistDetailsModel } from '../models/PlaylistDetailsModel';
import {  throwError, Subscription } from 'rxjs';
import { PlaylistService } from '../services/playlist.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { PlaylistTrackModel } from '../models/PlaylistTrackModel';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss']
})
export class PlaylistDetailComponent implements OnInit, OnDestroy {

  public playlist: PlaylistDetailsModel = null;
  private playlistSubScription: Subscription;
  public error: Error = null;
  public playlistId: number;

  public scrollCallback: any;
  public tracks: PlaylistTrackModel[] = [];
  public indexCount: number = 0;
  private trackCount: number = 30;
  public tracksIndex = 0;

  constructor(private playlistService: PlaylistService, private route: ActivatedRoute, @Inject(DOCUMENT) document) {
    this.scrollCallback = this.fetchingNewTracks.bind(this);
  }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.playlistId = +params.get('id');
      this.playlistSubScription = this.playlistService.getPlaylistDetails(this.playlistId).subscribe(data => {
        this.playlist = data;
      }, err => {
        this.error = err;
        return throwError(err);
      })
    });
  }

  fetchingNewTracks() {
    return this.playlistService.getPlaylistTracksFromIndex(this.playlistId, this.indexCount, this.trackCount).pipe(
      catchError((err: Error) => {
        return throwError(err);
      }),
      tap(newTracks => {
        this.tracks = this.tracks.concat(newTracks);
        if (this.indexCount <= this.playlist.totalTrackCount) {
          this.indexCount += this.trackCount;
        }
      }));
  }


  ngOnDestroy(): void {
    this.playlistSubScription.unsubscribe();
  }
}
