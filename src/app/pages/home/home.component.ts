import { AfterContentInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  private _eventSubscriptions = new Subscription();
  private _isReadySubscription = new Subscription();

  videoId = 'W372EX13-Uc'
  reframed: boolean;
  player: YT.Player;
  connection: HubConnection;
  playingStatue: string
  isloop = true;
  currentGroup: string;
  $currentGroup: Observable<string>;

  currentGroupFormControl = new FormControl('');
  constructor(
    public ytPlayerService: YtPlayerService,
    private store: Store<any>,
    public tubeConnect: ConnectorService,
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

        this.player = this.ytPlayerService.startVideo('');
        this.playCurrentVideo();

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
        console.log(this.getCurrentGroup(), 'current Group')
        console.log(this.videoId);
        this.connection.invoke('SendGroupTubeLink', this.getCurrentGroup(), playTag);
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

  playCurrentVideo(): void {
    this.$currentPlaying.pipe(take(1)).subscribe(v => {
      if (v) {
        this.ytPlayerService.startVideo(v);
      }
    });
  }

  /** DataControls
   * Store Data get/set
   */
  getStoreDatas(): void {
    this.$currentPlaying = this.store.select(
      state => state.appState.currentPlaying
    )
    this.$currentGroup = this.store.select(
      state => state.appState.currentGroup
    )
  }

  getCurrentGroup(): string {
    let result = '';
    this.$currentGroup.pipe(take(1)).subscribe(g => {
      if (g) {
        this.currentGroupFormControl.setValue(g);
        result = g;

      }
    })
    return result;
  }

  /** WebSocket
   * connection/actions
   */
  setConnection(): void {
    //this.tubeConnect.connectToServe();
    const connection = this.tubeConnect.serveConnection;

    connection.on('Connected', () => {
      console.log('Add Group');
      this.connection.invoke('AddGroup', this.getCurrentGroup());
    });

    connection.on('ReceiveTubeLink', (tubeLink) => {
      console.log(tubeLink, 'receive what?');
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
