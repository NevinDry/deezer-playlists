import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlaylistHeaderModel } from '../models/PlaylistHeaderModel';
import { Observable, throwError } from 'rxjs';
import { PlaylistService } from '../services/playlist.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-playlist-grid',
  templateUrl: './playlist-grid.component.html',
  styleUrls: ['./playlist-grid.component.scss']
})
export class PlaylistGridComponent implements OnInit {


  public playlists$: Observable<PlaylistHeaderModel[]>;
  public error: Error = null;
  userId: number = null;

  constructor(private playlistService: PlaylistService) {
    this.userId = this.playlistService.getFixedUserId();
  }

  ngOnInit() {
    this.playlists$ = this.playlistService.getUserPlaylist().pipe(
      catchError((err: Error) => {
        this.error = err;
        return throwError(err);
      })
    );
  }
}
