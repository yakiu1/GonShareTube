import { GonButtonComponent } from './components/gon-button/gon-button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { GonListItemComponent } from './components/gon-list-item/gon-list-item.component';
import { GonListComponent } from './components/gon-list/gon-list.component';
import { GonButtonListComponent } from './components/gon-button-list/gon-button-list.component';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, GonListItemComponent, GonButtonComponent, GonListComponent, GonButtonListComponent],
  imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, GonListItemComponent, GonButtonComponent, GonListComponent, GonButtonListComponent]
})
export class SharedModule { }
