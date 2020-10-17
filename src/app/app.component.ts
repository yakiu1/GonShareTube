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
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

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
    this.getStoreDatas();
  }

  ngAfterViewInit(): void {
    this.ytPlayerService.$isYoutubeAPIReady.subscribe(isLoading => {
      if (!isLoading) {
        this.isloading = false;
        this.router.navigate(['/home']);
      }

    })

    this.processConnectService();
  }

  processConnectService() {
    const connection = this.connectorService.serveConnection;

    connection.on('Connected', () => {
    })
    connection.on('ReceiveTubeLink', (tubeLink) => {
      console.log(tubeLink, 'receive what?');
      this.ytPlayerService.playVideo(tubeLink);
    });
  }

  getStoreDatas() {
    this.$playlist = this.store.select(state =>
      state.appState.playlist
    );

    this.$currentPlaying = this.store.select(
      state => state.appState.currentPlaying
    )
  }

  sendGroupTubeLink(tag: string): string {
    const currentGroup$ = this.store.select(
      state => state.appState.currentGroup
    )
    let result = '';
    currentGroup$.pipe(take(1)).subscribe(g => {
      if (g) {
        this.connectorService.serveConnection.invoke('SendGroupTubeLink', g, tag);

      }
    })
    return result;
  }

  doClick(tag: string): void {
    this.store.dispatch(AppActions.setSong({ currentPlaying: tag }))
    this.sendGroupTubeLink(tag);
  }
}
