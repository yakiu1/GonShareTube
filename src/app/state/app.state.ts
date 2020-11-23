import { VideoModle } from './../difs/modles/video.modle';

export interface AppState {
  playlist: VideoModle[];
  currentPlaying: string;
  currentGroup: string;
  priviousGroup: string;
  currentPlaylist: number;
}

export enum AppStateName {
  playlist = 'playlist',
  currentPlaying = 'currentPlaying',
  currentGroup = 'currentGroup',
  priviousGroup = 'priviousGroup',
  currentPlaylist = 'currentPlaylist',
}
