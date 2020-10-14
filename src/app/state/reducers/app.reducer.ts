/* eslint-disable @typescript-eslint/indent */
import { AppState } from './../app.state';
import { Action } from '@ngrx/store/src/models';
import * as AppActions from '../actions/app.actions'
import { createReducer, on } from '@ngrx/store';

// const initialState: SongInfo = {
//   songName: 'noSongNow',
//   songTag: 'nono',
//   displayName: '',
// }
export const initialState: AppState = {
  playlist: [],
  currentPlaying: ''
};

export const appReducer = createReducer(initialState,
  on(AppActions.setSong, (state, payload) => ({
    ...state,
    currentPlaying: payload.currentPlaying
  })),
  on(AppActions.addSong, (state, payload) => {
    return {
      ...state,
      playlist: [...state.playlist, payload.song]
    };
  }),
  on(AppActions.removeSong, (state, payload) => {
    let tempPlaylist = [];
    tempPlaylist = [...state.playlist];
    tempPlaylist.splice(payload.removeIndex, 1);
    return {
      ...state,
      playlist: tempPlaylist
    }
  })
)

export function reducer(state: AppState | undefined, action: Action): any {
  return appReducer(state, action);
}
