import { Component, OnInit, Input, HostListener } from '@angular/core';
import { PlaylistTrackModel } from 'src/app/models/PlaylistTrackModel';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-track-display',
  templateUrl: './track-display.component.html',
  styleUrls: ['./track-display.component.scss']
})
export class TrackDisplayComponent implements OnInit {
  public tracks: PlaylistTrackModel[] = [];
  public indexCount: number = 0;
  private playlistId: number;
  private trackCount: number = 30;
  private isFetchingTracks: boolean = false;


  constructor(private playlistService: PlaylistService) { }

  @Input('parentPlaylistId')
  set parentPlaylistId(id: any) {
    this.playlistId = id;
    this.isFetchingTracks = true;
    this.fetchingNewTracks();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    const scrollPercent = ((window.scrollY + window.innerHeight) * 100) / document.body.offsetHeight;
    if (!this.isFetchingTracks && scrollPercent > 100) {
      this.isFetchingTracks = true;
      this.fetchingNewTracks();
    }
  }

  ngOnInit() {
  }

  fetchingNewTracks() {
    this.playlistService.getPlaylistTracksFromIndex(this.playlistId, this.indexCount, this.trackCount).subscribe(
      newTracks => {
        this.tracks = this.tracks.concat(newTracks);
        this.indexCount += this.trackCount;
        this.isFetchingTracks = false;
      }
    )
  }
}
