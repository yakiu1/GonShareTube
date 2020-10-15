import { FriendComponent } from './friend.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YouTubePlayerModule } from '@angular/youtube-player';
import { FriendRoutingModule } from './friend-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FriendComponent],
  imports: [CommonModule, FriendRoutingModule, YouTubePlayerModule, ReactiveFormsModule]
})
export class FriendModule { }
