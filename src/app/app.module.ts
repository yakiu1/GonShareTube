import { LoadingPageModule } from './pages/loading-page/loading-page.module';
import { appReducer } from './state/reducers/app.reducer';
import { DetailModule } from './pages/detail/detail.module';
import { PlayListModule } from './pages/play-list/play-list.module';
import { HomeModule } from './pages/home/home.module';
import { OverviewModule } from './pages/overview/overview.module';
import { GonHoverableDropdownComponent } from './shared/components/gon-hoverable-dropdown/gon-hoverable-dropdown.component';
import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { AppComponent } from './app.component';
import { YouTubePlayerModule } from '@angular/youtube-player';


// NG Store
import { StoreModule } from '@ngrx/store';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, GonHoverableDropdownComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    OverviewModule,
    HomeModule,
    PlayListModule,
    DetailModule,
    LoadingPageModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    YouTubePlayerModule,
    StoreModule.forRoot({ appState: appReducer }),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
