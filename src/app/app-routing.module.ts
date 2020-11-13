import { LoadingPageRoutingModule } from './pages/loading-page/loading-page-routing.module';
import { PlayListRoutingModule } from './pages/play-list/play-list-routing.module';
import { OverviewRoutingModule } from './pages/overview/overview-routing.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeRoutingModule } from './pages/home/home-routing.module';
import { PageNotFoundComponent } from './shared/components';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'loadingpage',
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
    PlayListRoutingModule,
    LoadingPageRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
