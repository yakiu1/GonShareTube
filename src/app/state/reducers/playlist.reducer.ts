import { SongInfo } from './../../difs/song-info';
import { Action } from '@ngrx/store/src/models';
import * as PlayListActions from './../actions/playlist.actions'

// const initialState: SongInfo = {
//   songName: 'noSongNow',
//   songTag: 'nono',
//   displayName: '',
// }

export function playlistReducer(state: SongInfo[] = [], action: PlayListActions.Actions) {

  let tempState = [];
  switch (action.type) {

    case PlayListActions.ADD_SONG:
      return [...state, action.payload];

    case PlayListActions.REMOVE_SONG:
      tempState = [...state];
      tempState.splice(action.payload, 1);
      return tempState;

    default:
      return state;
  }

}
