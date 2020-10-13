import { OverviewComponent } from './overview.component';
import { NgModule } from '@angular/core';
import { OverviewRoutingModule } from './overview-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [OverviewComponent],
  imports: [CommonModule, OverviewRoutingModule]
})
export class OverviewModule { }
