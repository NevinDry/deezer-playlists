import { Injectable } from '@angular/core';
import { PlaylistHeaderModel } from '../models/PlaylistHeaderModel';
import { PlaylistDetailsModel } from '../models/PlaylistDetailsModel';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PlaylistTrackModel } from '../models/PlaylistTrackModel';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  public fixedUserId = 5;

  constructor(private http: HttpClient) { }

  getUserPlaylist(userId: number = this.fixedUserId): Observable<PlaylistHeaderModel[]> {
    return this.http.get(environment.deezerApiUrl + '/user/' + userId + '/playlists').pipe(
      map((res: any) => {
        return res.data.map(item => {
          return new PlaylistHeaderModel(item.id, item.picture_medium,item.title);
        })
      }),
      catchError((err: any) => {
        return throwError(new Error('Error getting playlists'));
      })
    );
  }

  getPlaylistDetails(playlistId: number): Observable<PlaylistDetailsModel> {
    return this.http.get(environment.deezerApiUrl + '/playlist/' + playlistId).pipe(
      map((item: any) => {
        return new PlaylistDetailsModel(item.id, item.picture_medium, item.title, item.creator.name, item.duration, item.nb_tracks);
      }),
      catchError((err: any) => {
        return throwError(new Error('Error getting playlist details'));
      })
    );
  }

  getPlaylistTracksFromIndex(playlistId: number, tracksIndex: number, trackCount:number): Observable<PlaylistTrackModel[]> {
    return this.http.get(environment.deezerApiUrl + '/playlist/' + playlistId + '/tracks?index=' + tracksIndex + '&limit=' + trackCount).pipe(
      map((res: any) => {
        return res.data.map((item: any) => {
          return new PlaylistTrackModel(item.id ,item.title, item.artist.name, item.duration);
          })       
      }),
      catchError((res: any) => {
        return throwError(new Error('Error getting playlist tracks'));
      })
    );
  }

  getFixedUserId(){
    return this.fixedUserId;
  }
}
