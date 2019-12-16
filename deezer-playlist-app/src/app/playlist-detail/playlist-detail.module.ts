import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaylistDetailRoutingModule } from './playlist-detail-routing.module';
import { PlaylistDetailComponent } from './playlist-detail.component';
import { PlaylistService } from '../services/playlist.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [PlaylistDetailComponent],
  imports: [
    CommonModule,
    PlaylistDetailRoutingModule,
    HttpClientModule
  ],
  providers: [
    PlaylistService
  ]
})
export class PlaylistDetailModule { }
