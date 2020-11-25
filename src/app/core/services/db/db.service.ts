import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class DbService extends Dexie {
  constructor() {
    super('GonShareTubeDb')
    this.version(1).stores({
      playlist: '++id, displayName, videos',
      user: '++id, displayName, playlists',
      room: '++id, displayName, roomTag',
    });
  }
}
