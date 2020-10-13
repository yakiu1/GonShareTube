import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FriendComponent } from './friend.component';

const routes: Routes = [
  {
    path: 'friend',
    component: FriendComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendRoutingModule {}
