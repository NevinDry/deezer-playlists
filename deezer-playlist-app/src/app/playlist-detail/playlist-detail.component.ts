import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { PlaylistDetailsModel } from '../models/PlaylistDetailsModel';
import { Observable, throwError } from 'rxjs';
import { PlaylistService } from '../services/playlist.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { catchError, switchMap, tap, map } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss']
})
export class PlaylistDetailComponent implements OnInit {

  public playlist$: any;
  public error: Error = null;

  constructor(private playlistService: PlaylistService, private route: ActivatedRoute, @Inject(DOCUMENT) document) { }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    let bar = document.getElementsByClassName('collapse-toolbar');
    let trackList = document.getElementsByClassName('table-tracks');
    let trackListTh = document.getElementsByClassName('table-header');
    if (window.pageYOffset > 80) {
      bar[0].classList.add('collapsed');
      trackList[0].classList.add('collapsed');  
      trackListTh[0].classList.add('collapsed');    
    }else {
      bar[0].classList.remove('collapsed');
      trackList[0].classList.remove('collapsed');  
      trackListTh[0].classList.remove('collapsed');    
    }
  }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.playlist$ = this.playlistService.getPlaylistDetails(+params.get('id')).pipe(
        catchError((err: Error) => {
          this.error = err;
          return throwError(err);
        })
      )
    });
  }
}
