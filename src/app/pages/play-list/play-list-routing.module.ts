import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PlayListComponent } from './play-list.component';

const routes: Routes = [
  {
    path: 'playlist',
    component: PlayListComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayListRoutingModule { }
