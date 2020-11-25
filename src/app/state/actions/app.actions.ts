import { VideoModle } from './../../difs/modles/video.modle';
import { createAction, props } from '@ngrx/store';

export const addSong = createAction(
  '[PLAYLIST] addSong',
  props<{ song: VideoModle }>()
);

export const setPlaylist = createAction(
  '[PLAYLIST] setPlaylist',
  props<{ playlist: VideoModle[] }>()
)

export const removeSong = createAction(
  '[PLAYLIST] removeSong',
  props<{ removeIndex: number }>()
);

export const setSong = createAction(
  '[PLAYLIST] setSong',
  props<{ currentPlaying: string }>()
);

export const setGroup = createAction(
  '[GROUP] setGroup',
  props<{ currentGroup: string }>()
)

export const setPriviousGroup = createAction(
  '[GROUP] setPriviousGroup',
  props<{ priviousGroup: string }>()
)

export const setSelectPlaylist = createAction(
  '[PLAYLIST] setSelectPlaylist',
  props<{ selectList: number }>()
)

//export type Actions = AddSong | RemoveSong | SetSong;
