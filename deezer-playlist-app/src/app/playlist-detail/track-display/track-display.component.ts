import { Component, OnInit, Input } from '@angular/core';
import { PlaylistTrackModel } from 'src/app/models/PlaylistTrackModel';

@Component({
  selector: 'app-track-display',
  templateUrl: './track-display.component.html',
  styleUrls: ['./track-display.component.scss']
})
export class TrackDisplayComponent implements OnInit {

  public tracks: PlaylistTrackModel[] = [];

  constructor() {
  }

  @Input('tracksFromParent')
  set tracksFromParent(tracks: PlaylistTrackModel[]) {
    this.tracks = tracks;
  }

  ngOnInit() {
  }


}
