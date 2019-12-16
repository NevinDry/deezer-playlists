import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaylistGridComponent } from './playlist-grid/playlist-grid.component';


const routes: Routes = [
  {path: '', component: PlaylistGridComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
