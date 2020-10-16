import { PlayListComponent } from './play-list.component';
import { NgModule } from '@angular/core';
import { PlayListRoutingModule } from './play-list-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { VideoFormComponent } from './video-form/video-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PlayListComponent, VideoFormComponent],
  imports: [CommonModule, PlayListRoutingModule, SharedModule, ReactiveFormsModule]
})
export class PlayListModule { }
