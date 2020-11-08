import { GonListData } from './../../difs/gon-list-data';
import { AfterContentInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentInit, OnDestroy {

  @ViewChild('footMenu', { static: true }) footMenu: ElementRef;

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
  gonListData: GonListData[] = [
    {
      index: 0, name: '第一首音樂', value: 'test1', description: 'test1'
    }, {
      index: 1, name: '第二首音樂', value: 'test1', description: 'test1'
    }, {
      index: 2, name: '第三首音樂', value: 'test1', description: 'test1'
    }, {
      index: 3, name: '第四首音樂', value: 'test1', description: 'test1'
    }, {
      index: 4, name: '第五五五五五五五五五五五五五五五五五首音樂', value: 'test1', description: 'test1'
    }
  ];

  listDataType = ListDataType.YTPlaylist;

  constructor(
    public ytPlayerService: YtPlayerService,
    public tubeConnect: ConnectorService,
    private store: Store<any>,
    private dataSelectorService: DataSelectorService,
  ) { }


  /** Special Features
   * special feature for this component
   */
  addListeners(): void {

    const _footMenuHTML = (this.footMenu.nativeElement as HTMLElement);
    const _footoptionArea = _footMenuHTML.querySelector('.foot-menu-area');
    const onConnectedHandler = this.tubeConnect.listeningServerEvent(ServerEventName.OnConnected)();
    const onReceiveTubeLinkHandler = this.tubeConnect.listeningServerEvent(ServerEventName.OnReceiveTubeLink)();
    // TODO wait for server compliete those methon
    const onReceiveTubeTimeHandler = this.tubeConnect.listeningServerEvent(ServerEventName.OnReceiveTubeTime)();
    const onStopTubeHandler = this.tubeConnect.listeningServerEvent(ServerEventName.OnReceiveStopTube)();



    const stopTube = onStopTubeHandler.subscribe((tubelink) => {
      this.player.stopVideo();
    })

    const receiveTubeTime = onReceiveTubeTimeHandler.subscribe((loaddata) => {
      this.player.loadVideoById(loaddata.videoId, loaddata.time);
    })

    const receiveTubeLink = onReceiveTubeLinkHandler.subscribe((tubeLink) => {
      this.player.loadVideoById(tubeLink);
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

  //點擊list事件
  clickListData(event:{index:number,data:GonListData}){

    console.log('event',event)
  }

  //點擊加號新增資料
  addListData(event:{index:number,data:GonListData}){
    this.gonListData.push(event.data);
    console.log(this.gonListData);
  }

  //刪除特定資料
  deleteListData(event){
    this.gonListData.splice(event,1);
    let count = 0;
    this.gonListData.forEach((data)=>{
      data.index = count;
      count++
    })
    console.log(this.gonListData);
  }


  /** DataControls
   * Store Data get/set
   */
  getStoreDatas(): void {
    this.currentPlaying$ = this.dataSelectorService.getStoreData(AppStateName.currentPlaying)();
    this.currentGroup$ = this.dataSelectorService.getStoreData(AppStateName.currentGroup)();
    this.priviouseGroup$ = this.dataSelectorService.getStoreData(AppStateName.priviousGroup)();
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



  /** LifeCycles
   * lifeCycle hooks below
   */

  ngAfterContentInit(): void {
    this.getStoreDatas();
    this.enterCurrentGroup();
    this.addListeners();
    this.startVideo();

  }

  ngOnDestroy(): void {
    this._eventSubscriptions.unsubscribe();
  }

  ngOnInit(): void {

  }


}
