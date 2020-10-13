import { FriendComponent } from './friend.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YouTubePlayerModule } from '@angular/youtube-player';
import { FriendRoutingModule } from './friend-routing.module';

@NgModule({
  declarations: [FriendComponent],
  imports: [CommonModule,FriendRoutingModule, YouTubePlayerModule]
})
export class FriendModule { }
