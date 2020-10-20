import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStateName } from 'app/state/app.state';
import * as AppActions from '../../state/actions/app.actions'
import { SongInfo } from './../../difs/song-info';
import { DataSelectorService } from './../../core/services/data-selector.service';
@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.scss']
})
export class PlayListComponent implements OnInit {

  @ViewChild('inputName') _input: ElementRef;

  $playList: Observable<SongInfo[]>;
  _playList: SongInfo[];

  constructor(
    private store: Store<any>,
    private dataSelectorService: DataSelectorService,
  ) {
  }

  ngOnInit(): void {
    this.$playList = this.dataSelectorService.getStoreData(AppStateName.playlist)();
  }

  doDeleteSong(index: number): void {
    this.store.dispatch(AppActions.removeSong({ removeIndex: index }))
  }

}
