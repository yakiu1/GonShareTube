import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoadingPageComponent } from './loading-page.component';

const routes: Routes = [
  {
    path: 'loadingpage',
    component: LoadingPageComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadingPageRoutingModule {}
