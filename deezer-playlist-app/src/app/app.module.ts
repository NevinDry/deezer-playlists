import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaylistService } from './services/playlist.service';
import { PlaylistGridComponent } from './playlist-grid/playlist-grid.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    PlaylistService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
