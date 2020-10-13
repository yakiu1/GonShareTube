import { PlayListRoutingModule } from './pages/play-list/play-list-routing.module';
import { FriendRoutingModule } from './pages/friend/friend-routing.module';
import { OverviewRoutingModule } from './pages/overview/overview-routing.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeRoutingModule } from './pages/home/home-routing.module';
import { PageNotFoundComponent } from './shared/components';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HomeRoutingModule,
    OverviewRoutingModule,
    FriendRoutingModule,
    PlayListRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
