import { Action } from '@ngrx/store/src/models';
import { SongInfo } from './../../difs/song-info';


export const ADD_SONG = '[PLAYLIST] Add'
export const REMOVE_SONG = '[PLAYLIST] Remove'

export class AddSong implements Action {
  readonly type = ADD_SONG

  constructor(public payload: SongInfo) {

  }
}

export class RemoveSong implements Action {
  type = REMOVE_SONG
  constructor(public payload: number) {

  }
}

export type Actions = AddSong | RemoveSong;
