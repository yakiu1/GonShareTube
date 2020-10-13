import { PlayListComponent } from './play-list.component';
import { NgModule } from '@angular/core';
import { PlayListRoutingModule } from './play-list-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { VideoFormComponent } from './video-form/video-form.component';

@NgModule({
  declarations: [PlayListComponent, VideoFormComponent],
  imports: [CommonModule, PlayListRoutingModule, SharedModule]
})
export class PlayListModule { }
