import { GonButtonComponent } from './components/gon-button/gon-button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { GonListItemComponent } from './components/gon-list-item/gon-list-item.component';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, GonListItemComponent, GonButtonComponent],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, GonListItemComponent, GonButtonComponent]
})
export class SharedModule { }
