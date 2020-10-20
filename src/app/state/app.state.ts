import { SongInfo } from './../difs/song-info';

export interface AppState {
  playlist: SongInfo[];
  currentPlaying: string;
  currentGroup: string;
  priviousGroup: string;
}

export enum AppStateName {
  playlist = 'playlist',
  currentPlaying = 'currentPlaying',
  currentGroup = 'currentGroup',
  priviousGroup = 'priviousGroup',
}
