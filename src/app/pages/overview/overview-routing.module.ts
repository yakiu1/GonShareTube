import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview.component';

const routes: Routes = [
  {
    path: 'overview',
    component: OverviewComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }
