/* eslint-disable @typescript-eslint/indent */
import { VideoModle } from './../../difs/modles/video.modle';
import { PlaylistModle } from './../../difs/modles/playlist.modle';
import { PlaylistInfoService } from './../../core/services/db/playlist-info.service';
import { GonListData } from './../../difs/gon-list-data';
import { AfterContentInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, fromEvent, Observable, Subscription } from 'rxjs';
import { last, switchMap, take } from 'rxjs/operators';
import { AppStateName } from 'app/state/app.state';
import { DataSelectorService } from './../../core/services/data-selector.service';
import { ConnectorService, YtPlayerService } from '../../../app/core/services';
import * as AppActions from '../../state/actions/app.actions'
import { ServerEventName } from 'app/difs/server-event-name.enum';
import { ListDataType } from '../../difs/list-data-type.enum';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {

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

  gonButtonListDatas: GonListData[] = [];

  listDataType = ListDataType.YTPlaylist;
  isReceiving = true;//判斷是否為自己控制自己音樂
  gonVideoList$ = new Subject<GonListData[]>();
  currentPlaylistId$: Observable<number>;
  currentPlaylist$: Observable<VideoModle[]>;

  constructor(
    public ytPlayerService: YtPlayerService,
    public tubeConnect: ConnectorService,
    private store: Store<any>,
    private dataSelectorService: DataSelectorService,
    private playlistInfoService: PlaylistInfoService,
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
    const onCurrnetPlaylistChange = this.currentPlaylistId$;

    const syncPlayListData = onCurrnetPlaylistChange.subscribe(id => {
      this.playlistInfoService.getAllVideoByPlaylistId(id).then(pl => {
        const gonListData = [];
        pl.videos.forEach(v => {
          const video: GonListData = {
            index: 0,
            value: v.tag,
            name: v.displayName,
            description: v.displayName,
          }

          gonListData.push(video)
        })
        this.gonVideoList$.next(gonListData);
      })
    })

    const stopTube = onStopTubeHandler.subscribe(_ => {
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
      .pipe(take(1))
      .subscribe(tag => {
        this.tubeConnect.serveConnection.invoke('SendTubeTime', tag, time, this._groupID);
      });
  }

  doStop(): void {
    this.dataSelectorService.getStoreData(AppStateName.currentPlaying)()
      .pipe(take(1))
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

  createPlayList(evt: GonListData): void {
    const newPlayList: PlaylistModle = {
      id: +evt.index,
      displayName: evt.name,
      videos: [],
    }

    this.playlistInfoService.add(newPlayList);
  }

  selectPlaylist(index: number): void {
    this.store.dispatch(AppActions.setSelectPlaylist({ selectList: index }))
  }

  clickListData(event: { index: number, data: GonListData }): void {
    this.store.dispatch(AppActions.setSong({ currentPlaying: event.data.value }))
    this.sendGroupTubeLink(event.data.value);
    this.player.loadVideoById(event.data.value);
  }

  doAddVideo(event: GonListData): void {
    const url: string = event.value;
    const newVideo: VideoModle = {
      displayName: event.name,
      tag: this.parseURLToTag(url),
    }

    this.currentPlaylistId$.pipe(take(1)).subscribe(id => {
      this.playlistInfoService.addVideoByPlaylistId(id, newVideo).then(_ => {
        this.store.dispatch(AppActions.addSong({ song: newVideo }));
        this.syncPlaylist(id);
      });

    })

  }

  parseURLToTag(url: string): string {
    const tag = url.split('=')[1].split('&')[0];
    return tag;
  }

  sendGroupTubeLink(tag: string): void {
    const currentGroup$ = this.dataSelectorService.getStoreData(AppStateName.currentGroup)();
    currentGroup$.pipe(take(1)).subscribe(g => {
      if (g) {
        this.tubeConnect.serveConnection.invoke('SendGroupTubeLink', g, tag);
      }
    })
  }

  deleteListData(index: number): void {
    this.currentPlaylistId$
      .pipe(
        take(1),
        switchMap(id => {
          const s = new Subject<number>()
          this.playlistInfoService.removeVideoByIndex(id, index).then(_ => s.next(id));
          return s.pipe(take(1))
        })
      )
      .subscribe(id => {
        this.syncPlaylist(id);
      })
  }


  syncPlaylist(id: number): void {
    this.playlistInfoService.getAllVideoByPlaylistId(id).then(a => {
      const currentPlaylist = []
      a.videos.forEach(v => {
        const video: GonListData = {
          index: v.id,
          name: v.displayName,
          value: v.tag,
          description: v.displayName,
        }
        currentPlaylist.push(video);

      })
      this.gonVideoList$.next(currentPlaylist);
    })
  }

  changeRoom(): void {
    this.store.dispatch(AppActions.setGroup({ currentGroup: this.currentGroupFormControl.value }));
    this.enterCurrentGroup();

    const toastElement = this.roomToast.nativeElement as HTMLElement;
    toastElement.classList.add('toast-sm-show');
    setTimeout(() => {
      toastElement.classList.remove('toast-sm-show');
    }, 1000);
  }

  switchReceiveBroadcast(): void {
    this.isReceiving = !this.isReceiving;
  }

  /** DataControls
   * Store Data get/set
   */
  getStoreDatas(): void {
    this.currentPlaying$ = this.dataSelectorService.getStoreData(AppStateName.currentPlaying)();
    this.currentGroup$ = this.dataSelectorService.getStoreData(AppStateName.currentGroup)();
    this.priviouseGroup$ = this.dataSelectorService.getStoreData(AppStateName.priviousGroup)();
    this.currentPlaylistId$ = this.dataSelectorService.getStoreData(AppStateName.currentPlaylist)();
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

  setInitData(): void {
    this.currentPlaylistId$.pipe(take(1),
      switchMap(id => {
        return this.playlistInfoService.getAllVideoByPlaylistId(id)
      })
    ).subscribe(pl => {
      const gonListData = [];
      pl.videos.forEach(v => {
        const video: GonListData = {
          index: v.id,
          value: v.tag,
          name: v.displayName,
          description: v.displayName,
        }
        gonListData.push(video)
      })
      this.gonVideoList$.next(gonListData);
    })
  }

  /**
   * DbData
   */
  getAllDbData(): void {
    this.playlistInfoService.getAll().then(a => {
      const playlistBtnData = [];
      a.forEach(p => {
        const temp: GonListData = {
          index: p.id,
          value: p.id.toString(),
          name: p.displayName,
          description: p.displayName,
        }
        playlistBtnData.push(temp);
      })
      this.gonButtonListDatas = playlistBtnData;
    })

    this.playlistInfoService.getAllVideoByPlaylistId(0).then(a => {
      const currentPlaylist = []
      a.videos.forEach(v => {
        const video: VideoModle = {
          id: v.id,
          displayName: v.displayName,
          tag: v.tag,
        }
        currentPlaylist.push(video);
      })
      this.store.dispatch(AppActions.setPlaylist({ playlist: currentPlaylist }));
    })
  }


  /** LifeCycles
   * lifeCycle hooks below
   */

  ngAfterContentInit(): void {
    this.getStoreDatas();
    this.enterCurrentGroup();
    this.addListeners();
    this.getAllDbData();
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
