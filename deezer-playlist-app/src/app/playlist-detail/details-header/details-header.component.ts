import { Component, OnInit, Input, HostListener, Inject } from '@angular/core';
import { PlaylistDetailsModel } from 'src/app/models/PlaylistDetailsModel';

@Component({
  selector: 'app-details-header',
  templateUrl: './details-header.component.html',
  styleUrls: ['./details-header.component.scss']
})
export class DetailsHeaderComponent implements OnInit {

  public playlistDetails: PlaylistDetailsModel;

  constructor() { }

  @Input('playlist')
  set playlist(playlist: any) {
    this.playlistDetails = playlist || {};
  }

  ngOnInit() {
  }

}
