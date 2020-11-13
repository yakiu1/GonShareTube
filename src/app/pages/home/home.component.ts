import { GonListData } from './../../difs/gon-list-data';
import { AfterContentInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, fromEvent, Observable, Subscription } from 'rxjs';
import { last, take } from 'rxjs/operators';
import { AppStateName } from 'app/state/app.state';
import { DataSelectorService } from './../../core/services/data-selector.service';
import { ConnectorService, YtPlayerService } from '../../../app/core/services';
import * as AppActions from '../../state/actions/app.actions'
import { ServerEventName } from 'app/difs/server-event-name.enum';
import { ListDataType } from '../../difs/list-data-type.enum';
import { SongInfo } from 'app/difs/song-info';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentInit,AfterViewInit, OnDestroy {

  @ViewChild('footMenu', { static: true }) footMenu: ElementRef;
  @ViewChild('roomToast', { static: true }) roomToast: ElementRef;

  isReadyVideo$ = new BehaviorSubject<boolean>(false);
  currentPlaying$: Observable<string>;
  private _eventSubscriptions = new Subscription();

  videoId = '';
  reframed: boolean;
  player: YT.Player;
  playingStatue: string
  isloop = true;
  currentGroup: string;
  currentGroup$: Observable<string>;

  currentGroupFormControl = new FormControl('');
  private _groupID: string;
  priviouseGroup$: Observable<string>;

  gonButtonListDatas: GonListData[] = [{
    index: 0, name: '1', value: 'test1', description: 'test1'
  }, {
    index: 1, name: '2', value: 'test1', description: 'test1'
  }, {
    index: 2, name: '3', value: 'test1', description: 'test1'
  }, {
    index: 3, name: '4', value: 'test1', description: 'test1'
  }, {
    index: 4, name: '5', value: 'test1', description: 'test1'
  },
  ];

  listDataType = ListDataType.YTPlaylist;
  isReceiving = true;//判斷是否為自己控制自己音樂
  gonVideoList$ = new Subject<GonListData[]>();
  currentPlaylist$: Observable<any>;

  constructor(
    public ytPlayerService: YtPlayerService,
    public tubeConnect: ConnectorService,
    private store: Store<any>,
    private dataSelectorService: DataSelectorService,
    private el: ElementRef
  ) { }


  /** Special Features
   * special feature for this component
   */
  addListeners(): void {

    const _footMenuHTML = (this.footMenu.nativeElement as HTMLElement);
    const _footoptionArea = _footMenuHTML.querySelector('.foot-menu-area');
    const onConnectedHandler = this.tubeConnect.listeningServerEvent(ServerEventName.OnConnected)();
    const onReceiveTubeLinkHandler = this.tubeConnect.listeningServerEvent(ServerEventName.OnReceiveTubeLink)();
    const onReceiveTubeTimeHandler = this.tubeConnect.listeningServerEvent(ServerEventName.OnReceiveTubeTime)();
    const onStopTubeHandler = this.tubeConnect.listeningServerEvent(ServerEventName.OnReceiveStopTube)();
    const onCurrnetPlaylistChange = this.currentPlaylist$;

    const syncPlayListData = onCurrnetPlaylistChange.subscribe(playlist => {
      const gonListData = [];
      playlist.forEach(v => {
        const video: GonListData = {
          index: 0,
          value: v.songTag,
          name: v.songName,
          description: '',
        }

        gonListData.push(video)
      })
      this.gonVideoList$.next(gonListData);
      console.log(gonListData);
      console.log(playlist, 'syncData!!');
    })

    const stopTube = onStopTubeHandler.subscribe((tubelink) => {
      if (this.isReceiving) {
        this.player.stopVideo();
      }
    })

    const receiveTubeTime = onReceiveTubeTimeHandler.subscribe((loaddata) => {
      if (this.isReceiving) {
        this.player.loadVideoById(loaddata.videoId, loaddata.time);
      }
    })

    const receiveTubeLink = onReceiveTubeLinkHandler.subscribe((tubeLink) => {
      if (this.isReceiving) {
        this.player.loadVideoById(tubeLink);
      }
    })

    const mouseEnter = fromEvent(_footMenuHTML, 'mouseenter').subscribe(() => {
      _footoptionArea.classList.remove('fadeout');
      _footoptionArea.classList.add('fadein');
    });

    const mouseLeave = fromEvent(_footMenuHTML, 'mouseleave').subscribe(() => {
      _footoptionArea.classList.remove('fadein');
      _footoptionArea.classList.add('fadeout');
    });

    const isConnected = onConnectedHandler.subscribe((isconnected) => {
      const tempgroup = this._groupID;
      if (isconnected) {
        this.tubeConnect.serveConnection.invoke('AddGroup', this._groupID, tempgroup);
      }
    })

    this._eventSubscriptions.add(mouseLeave);
    this._eventSubscriptions.add(mouseEnter);
    this._eventSubscriptions.add(isConnected);
    this._eventSubscriptions.add(receiveTubeLink);
    this._eventSubscriptions.add(receiveTubeTime);
    this._eventSubscriptions.add(stopTube);
    this._eventSubscriptions.add(syncPlayListData);
  }

  startVideo(): void {
    const currentPlaying = this.dataSelectorService.getStoreData(AppStateName.currentPlaying)();
    currentPlaying.pipe(take(1)).subscribe(tag => {
      this.videoId = tag;
      this.player = this.ytPlayerService.startVideo(tag);
      this._eventSubscriptions.add(this.player.addEventListener('onStateChange', evt => {
        const isloop: boolean = this.isloop;
        if (evt['data'] === YT.PlayerState.ENDED && isloop) {
          this.player.playVideo();
        }
      }))
    });
  }

  shareVideo(): void {
    // this.tubeConnect.serveConnection.invoke('SendTubeLink', this.videoId);
  }

  doShareAt(): void {
    const time = this.player.getCurrentTime();
    this.dataSelectorService.getStoreData(AppStateName.currentPlaying)()
      .subscribe(tag => {
        this.tubeConnect.serveConnection.invoke('SendTubeTime', tag, time, this._groupID);
      });
  }

  doStop(): void {
    this.dataSelectorService.getStoreData(AppStateName.currentPlaying)()
      .subscribe(tag => {
        this.tubeConnect.serveConnection.invoke('SendStopTube', tag, this._groupID);
      });
    this.player.stopVideo();
  }

  switchLoop(): void {
    this.isloop = this.isloop ? false : true;
    if (this.player.getPlayerState() === YT.PlayerState.ENDED) {
      this.player.playVideo();
    }
  }

  doCreatePlayList(): void {
    // TODO : Add new playlist
    console.log('Add new playlist!');
  }

  clickListData(event: { index: number, data: GonListData }) {
    this.store.dispatch(AppActions.setSong({ currentPlaying: event.data.value }))
    this.sendGroupTubeLink(event.data.value);
    this.player.loadVideoById(event.data.value);
  }

  doAddVideo(event: GonListData): void {
    const url: string = event.value;
    const newVideo: SongInfo = {
      songName: event.name,
      songTag: this.parseURLToTag(url),
    }
    console.log('add!!', newVideo);
    this.store.dispatch(AppActions.addSong({ song: newVideo }));
  }

  parseURLToTag(url: string): string {
    const tag = url.split('=')[1].split('&')[0];
    return tag;
  }

  sendGroupTubeLink(tag: string): void {
    const currentGroup$ = this.dataSelectorService.getStoreData(AppStateName.currentGroup)();
    currentGroup$.pipe(take(1)).subscribe(g => {
      if (g) {
        console.log('sent tube link sent');
        this.tubeConnect.serveConnection.invoke('SendGroupTubeLink', g, tag);
      }
    })
  }

  deleteListData(event: number) {
    this.store.dispatch(AppActions.removeSong({ removeIndex: event }))
  }

  changeRoom(event: KeyboardEvent) {
    this.store.dispatch(AppActions.setGroup({ currentGroup: this.currentGroupFormControl.value }));
    this.enterCurrentGroup();

    const toastElement = this.roomToast.nativeElement as HTMLElement;
    toastElement.classList.add('toast-sm-show');
    setTimeout(() => {
      toastElement.classList.remove('toast-sm-show');
    }, 1000);
  }

  switchReceiveBroadcast() {
    this.isReceiving = !this.isReceiving;
  }

  /** DataControls
   * Store Data get/set
   */
  getStoreDatas(): void {
    this.currentPlaying$ = this.dataSelectorService.getStoreData(AppStateName.currentPlaying)();
    this.currentGroup$ = this.dataSelectorService.getStoreData(AppStateName.currentGroup)();
    this.priviouseGroup$ = this.dataSelectorService.getStoreData(AppStateName.priviousGroup)();
    this.currentPlaylist$ = this.dataSelectorService.getStoreData(AppStateName.playlist)();
  }

  enterCurrentGroup(): void {
    const currentGroup = this.currentGroup$.pipe(take(1));
    const priviousGroup = this.priviouseGroup$.pipe(take(1));
    const combined = combineLatest([currentGroup, priviousGroup]);

    combined.pipe(last()).subscribe(([current, privious]) => {
      if (current) {
        this.tubeConnect.serveConnection.invoke('AddGroup', current, privious);
        this.store.dispatch(AppActions.setPriviousGroup({ priviousGroup: current }))
        this.currentGroupFormControl.setValue(current);
        this._groupID = current;
      }
    })
  }

  setInitData() {
    this.currentPlaylist$.pipe(take(1)).subscribe(playlist => {
      const gonListData = [];
      playlist.forEach(v => {
        const video: GonListData = {
          index: 0,
          value: v.songTag,
          name: v.songName,
          description: '',
        }
        gonListData.push(video)
      })
      this.gonVideoList$.next(gonListData);
    })
  }

  /** LifeCycles
   * lifeCycle hooks below
   */

  ngAfterContentInit(): void {
    this.getStoreDatas();
    this.enterCurrentGroup();
    this.addListeners();
    this.startVideo();
    // 隨機數字2次方之後 以36位數(0~9 + a~z)進位轉字串
    // this.secretNo = Math.pow(Math.floor(Math.random() * 100000) + 1, 2).toString(36);
  }

  ngAfterViewInit(): void {
    this.setInitData();
  }
  ngOnDestroy(): void {
    this._eventSubscriptions.unsubscribe();
  }

  ngOnInit(): void {

  }


}
