import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingPageRoutingModule } from './loading-page-routing.module';

import { LoadingPageComponent } from './loading-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoadingPageComponent],
  imports: [CommonModule, LoadingPageRoutingModule, SharedModule, ReactiveFormsModule]
})
export class LoadingPageModule { }
