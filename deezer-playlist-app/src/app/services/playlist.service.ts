import { Injectable } from '@angular/core';
import { PlaylistHeaderModel } from '../models/PlaylistHeaderModel';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private fixedUserId = 5;

  constructor(private http: HttpClient) { }

  getUserPlaylist(number = this.fixedUserId): Observable<PlaylistHeaderModel[]> {
    return this.http.get(environment.deezerApiUrl + '/user/' + this.fixedUserId + '/playlists').pipe(
      map((res: any) => {
        return res.data.map(item => {
          return {
            id: item.id,
            title: item.title,
            coverLink: item.picture_medium
          }
        })
      }),
      catchError((res: any) => {
        return throwError(new Error('Error getting playlists'));
      })
    );
  }
}
