import { Component, OnInit } from '@angular/core';
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

  private playlist$: Observable<PlaylistHeaderModel[]>;
  error: Error = null;

  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {
    this.playlist$ = this.playlistService.getUserPlaylist().pipe(
      catchError((err:Error) => {
        this.error = err;
        return throwError(err);
      })
    );
  }
}
