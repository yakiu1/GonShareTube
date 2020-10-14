import { AfterContentInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import { ConnectorService, YtPlayerService } from 'app/core/services';
import { BehaviorSubject, fromEvent, Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentInit, OnDestroy {

  @ViewChild('footMenu', { static: true }) footMenu: ElementRef;



  $isReadyVideo = new BehaviorSubject<boolean>(false);
  $currentPlaying: Observable<string>;
  private _isReadySubscription = new Subscription();
  private _eventSubscriptions = new Subscription();

  videoId = 'W372EX13-Uc'
  reframed: boolean;
  player: YT.Player;
  connection: HubConnection;
  playingStatue: string
  isloop = true;

  constructor(
    private ytPlayerService: YtPlayerService,
    private tubeConnect: ConnectorService,
    private store: Store<any>
  ) { }


  /** Special Features
   * special feature for this component
   */
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
        this.getCurrentPlayVideo();
        this.player = this.ytPlayerService.startVideo(this.videoId);
        this.player.addEventListener('onStateChange', evt => {
          const isloop: boolean = this.isloop;
          console.log(evt, '<==== video state change');
          if (evt['data'] === YT.PlayerState.ENDED && isloop) {
            this.player.playVideo();
          }
        })
      }
    }));

    this.$currentPlaying.subscribe(playTag => {
      if (playTag.length > 0) {
        this.videoId = playTag;
        this.connection.invoke('SendTubeLink', playTag);
        console.log(this.videoId);
      }
    })

  }

  shareVideo(): void {
    this.connection.invoke('SendTubeLink', this.videoId);
  }

  switchLoop(): void {
    this.isloop = this.isloop ? false : true;
    if (this.player.getPlayerState() === YT.PlayerState.ENDED) {
      this.player.playVideo();
    }
  }
  /** DataControls
   * Store Data get/set
   */
  getStoreDatas(): void {
    this.$currentPlaying = this.store.select(
      state => state.appState.currentPlaying
    )
  }

  getCurrentPlayVideo(): void {
    this.$currentPlaying.pipe(take(1)).subscribe(v => { if (v) {
      console.log(v,'v');
      this.videoId = v } });
  }

  /** WebSocket
   * connection/actions
   */
  setConnection(): void {
    const connection = this.tubeConnect.connectToServe();
    connection.start();
    connection.on('ReceiveTubeLink', (tubeLink) => {
      this.player.loadVideoById(tubeLink);
    });
    this.connection = connection;
  }


  /** LifeCycles
   * lifeCycle hooks below
   */

  ngAfterContentInit(): void {
    this.loadYoutubeAPI();
    this.setConnection();
    this.getStoreDatas();
    this.addListeners();
  }

  ngOnDestroy(): void {
    this._eventSubscriptions.unsubscribe();
    this._isReadySubscription.unsubscribe();
  }

  ngOnInit(): void {

  }


}
