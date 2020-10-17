import { ConnectorService, YtPlayerService } from 'app/core/services';
import { SongInfo } from './difs/song-info';
import { AfterContentInit, AfterViewInit, Component } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AppActions from './state/actions/app.actions'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, AfterContentInit {

  $playlist: Observable<SongInfo[]>;
  $currentPlaying: Observable<string>;
  isloading = true;

  constructor(
    public ytPlayerService: YtPlayerService,
    public connectorService: ConnectorService,
    private router: Router,
    private electronService: ElectronService,
    private translate: TranslateService,
    private store: Store<any>
  ) {
    this.translate.setDefaultLang('en');
    connectorService.connectToServe();

    console.log('AppConfig', AppConfig);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }

    this.ytPlayerService.downloadYoutubeAPI();

    this.$playlist = store.select(state =>
      state.appState.playlist
    );

    this.$currentPlaying = store.select(
      state => state.appState.currentPlaying
    )

  }
  ngAfterContentInit(): void {
    // this.setSongLists();
  }

  ngAfterViewInit(): void {
    this.ytPlayerService.$isYoutubeAPIReady.subscribe(isLoading => {
      if (!isLoading) {
        this.isloading = false;
        this.router.navigate(['/home']);
      }

    })
  }

  // setSongLists(): void {

  //   const playlistMonkData: SongInfo[] = [
  //     { songName: '2020流行歌曲', songTag: 'eM9VJ2R2vUc' },
  //     { songName: 'Divinity Original Sin 2 OST 01 Main Theme', songTag: 'HAsIefETSB' },
  //     { songName: 'Divinity Original Sin 2 OST 02 Mead Gold and Blood', songTag: '_hrLcxL1Fyg' },
  //     { songName: 'Divinity Original Sin 2 OST 03 Symphony of the Void', songTag: 'eLPHYQlKArU' },
  //     { songName: 'Divinity Original Sin 2 OST 04 Rivellon', songTag: 'W372EX13-Uc' },
  //     { songName: 'Divinity Original Sin 2 OST 05 Welcome to Fort Joy', songTag: 'VIZp68FhbGE' },
  //   ];

  //   playlistMonkData.forEach(s => {
  //     this.store.dispatch(AppActions.addSong({ song: s }));
  //   })

  // }

  doClick(tag: string): void {
    this.store.dispatch(AppActions.setSong({ currentPlaying: tag }))
  }

}
