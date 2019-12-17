import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaylistDetailRoutingModule } from './playlist-detail-routing.module';
import { PlaylistDetailComponent } from './playlist-detail.component';
import { PlaylistService } from '../services/playlist.service';
import { HttpClientModule } from '@angular/common/http';
import { TrackDisplayComponent } from './track-display/track-display.component';
import { MinuteSecondsPipe } from '../pipes/SecondsToTimeStringPipe';
import { DetailsHeaderComponent } from './details-header/details-header.component';


@NgModule({
  declarations: [PlaylistDetailComponent, TrackDisplayComponent, MinuteSecondsPipe, DetailsHeaderComponent],
  imports: [
    CommonModule,
    PlaylistDetailRoutingModule,
    HttpClientModule
  ],
  providers: [
    PlaylistService,
    MinuteSecondsPipe
  ]
})
export class PlaylistDetailModule { }
