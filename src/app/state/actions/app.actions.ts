import { createAction, props } from '@ngrx/store';
import { SongInfo } from '../../difs/song-info';

export const addSong = createAction(
  '[PLAYLIST] addSong',
  props<{ song: SongInfo }>()
);

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

//export type Actions = AddSong | RemoveSong | SetSong;
