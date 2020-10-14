import { SongInfo } from './../../difs/song-info';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AppActions from '../../state/actions/app.actions'
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
    private store: Store<any>
  ) {
    this.$playList = store.select(state => {
      return state.appState.playlist});
  }

  ngOnInit(): void {
  }

  doAddSong(name: string): void {
    const songInfo: SongInfo = {
      songName: name,
      songTag: name
    }
    this.store.dispatch(AppActions.addSong({ song: songInfo }))
    this._input.nativeElement.value = "";
  }

  doDeleteSong(index: number): void {
    this.store.dispatch(AppActions.removeSong({ removeIndex: index }))
  }
}
