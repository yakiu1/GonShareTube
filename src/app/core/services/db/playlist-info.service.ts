import { VideoModle } from './../../../difs/modles/video.modle';
import { PlaylistModle } from './../../../difs/modles/playlist.modle';
import { DbService } from './db.service';
import { Injectable } from '@angular/core';
import { Collection, PromiseExtended } from 'dexie';

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

  getAllVideoByPlaylistId(id: number): PromiseExtended<PlaylistModle> {
    return this.table.where('id').equals(id).first();
  }

  add(data: PlaylistModle): PromiseExtended<number> {
    return this.table.add(data);
  }

  async addVideoByPlaylistId(id: number, v: VideoModle): Promise<PromiseExtended<number>> {
    const data = await this.table.where('id').equals(id).first();
    data.videos.push(v);
    return this.table.update(id, data);
  }

  update(id: number, data: PlaylistModle): PromiseExtended<number> {
    return this.table.update(id, data);
  }

  async updatePlaylistVideosById(id: number, vs: VideoModle[]): Promise<PromiseExtended<number>> {
    const data = await this.table.where('id').equals(id).first();
    data.videos = vs;
    return this.table.update(id, data);
  }

  remove(id: number): PromiseExtended<void> {
    return this.table.delete(id);
  }

  async removeVideoByIndex(id: number, vid: number): Promise<PromiseExtended<number>> {
    const data = await this.table.where('id').equals(id).first();
    data.videos.splice(vid, 1);
    return this.table.update(id, data);
  }
}
