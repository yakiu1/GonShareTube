/* eslint-disable @typescript-eslint/indent */
import { AppState } from './../app.state';
import { Action } from '@ngrx/store/src/models';
import * as AppActions from '../actions/app.actions'
import { createReducer, on } from '@ngrx/store';

export const initialState: AppState = {
  playlist: [],
  currentPlaying: '',
  currentGroup: Math.floor(Math.random() * Math.floor(1000000)).toString(),
  priviousGroup: '',
};

export const appReducer = createReducer(initialState,
  on(AppActions.setSong, (state, payload) => {
    return {
      ...state,
      currentPlaying: payload.currentPlaying
    }
  }),
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
  }),
  on(AppActions.setGroup, (state, payload) => {
    return {
      ...state,
      currentGroup: payload.currentGroup
    }
  }),
  on(AppActions.setPriviousGroup, (state, payload) => {
    return {
      ...state,
      priviousGroup: payload.priviousGroup
    }
  })
)

export function reducer(state: AppState | undefined, action: Action): any {
  return appReducer(state, action);
}
