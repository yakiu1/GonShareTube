import { PlaylistModle } from './../../../difs/modles/playlist.modles';
import { DbService } from './db.service';
import { Injectable } from '@angular/core';
import { PromiseExtended } from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class PlaylistInfoService {

  table: Dexie.Table<PlaylistModle, number>

  constructor(private dbService: DbService) {
    this.table = this.dbService.table('playlist');
  }

  getAll(): PromiseExtended<PlaylistModle[]> {
    return this.table.toArray();
  }

  add(data: PlaylistModle): PromiseExtended<number> {
    return this.table.add(data);
  }

  update(id: number, data: PlaylistModle): PromiseExtended<number> {
    return this.table.update(id, data);
  }

  remove(id: number): PromiseExtended<void> {
    return this.table.delete(id);
  }
}
