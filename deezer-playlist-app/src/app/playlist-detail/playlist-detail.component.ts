import { Component, OnInit } from '@angular/core';
import { PlaylistDetailsModel } from '../models/PlaylistDetailsModel';
import { Observable, throwError } from 'rxjs';
import { PlaylistService } from '../services/playlist.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { catchError, switchMap, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss']
})
export class PlaylistDetailComponent implements OnInit {

  private playlist$:any;
  private error: Error = null;

  constructor(private playlistService: PlaylistService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.playlist$ = this.playlistService.getPlaylistDetails(+params.get('id')).pipe(
        catchError((err:Error) => {
          this.error = err;
          return throwError(err);
        })
      )
    });
  }
}
