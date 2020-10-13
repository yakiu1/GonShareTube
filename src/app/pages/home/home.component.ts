import { AfterContentInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection } from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import { ConnectorService, YtPlayerService } from 'app/core/services';
import { BehaviorSubject, fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentInit, OnDestroy {

  @ViewChild('footMenu', { static: true }) footMenu: ElementRef;


  _isReadySubscription = new Subscription();
  _eventSubscriptions = new Subscription();
  $isReadyVideo = new BehaviorSubject<boolean>(false);
  videoId = 'WBI_cOPTzPU'
  reframed: boolean;
  player: YT.Player;
  connection: HubConnection;
  $currentPlaying: Observable<string>;

  constructor(
    router: Router,
    private ytPlayerService: YtPlayerService,
    private tubeConnect: ConnectorService,
    private store: Store<any>
  ) {

  }

  ngAfterContentInit(): void {
    this.loadYoutubeAPI();
    this.setConnection();
    this.getStoreDatas();
    this.addListeners();
  }

  getStoreDatas() {
    this.$currentPlaying = this.store.select(
      state => state.appState.currentPlaying
    )
  }

  ngOnDestroy(): void {
    this._eventSubscriptions.unsubscribe();
    this._eventSubscriptions.unsubscribe();
  }

  loadYoutubeAPI(): void {
    const tag = document.createElement('script');

    if (document.getElementsByTagName('script')[1].src !== 'https://www.youtube.com/iframe_api') {
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window['onYouTubeIframeAPIReady'] = () => {
        this.$isReadyVideo.next(true);
      }
    } else {
      this.$isReadyVideo.next(true);
    }
  }

  addListeners(): void {
    const _footMenuHTML = (this.footMenu.nativeElement as HTMLElement);
    const _footoptionArea = _footMenuHTML.querySelector('.foot-menu-area');

    this._eventSubscriptions.add(fromEvent(_footMenuHTML, 'mouseenter').subscribe(() => {
      _footoptionArea.classList.remove('fadeout');
      _footoptionArea.classList.add('fadein');
    }));

    this._eventSubscriptions.add(fromEvent(_footMenuHTML, 'mouseleave').subscribe(() => {
      _footoptionArea.classList.remove('fadein');
      _footoptionArea.classList.add('fadeout');
    }));

    this._isReadySubscription.add(this.$isReadyVideo.subscribe(isReady => {
      if (isReady) {
        this.player = this.ytPlayerService.startVideo(this.videoId);
      }
    }));

    this.$currentPlaying.subscribe(playTag => {
      this.connection.invoke('SendTubeLink', playTag);
    })

  }

  setConnection(): void {
    const connection = this.tubeConnect.connectToServe();
    connection.start();
    connection.on('ReceiveTubeLink', (tubeLink) => {
      this.player.loadVideoById(tubeLink);
    });
    this.connection = connection;
  }

  ngOnInit(): void {

  }

  shareVideo(): void {
    this.connection.invoke('SendTubeLink', this.videoId);
  }
}
