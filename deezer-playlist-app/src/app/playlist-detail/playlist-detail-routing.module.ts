import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaylistDetailComponent } from './playlist-detail.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: PlaylistDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaylistDetailRoutingModule { }
