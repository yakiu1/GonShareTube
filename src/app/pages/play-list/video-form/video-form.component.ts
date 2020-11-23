import { PlaylistInfoService } from './../../../core/services/db/playlist-info.service';
import { DbService } from './../../../core/services/db/db.service';
import { VideoModle } from './../../../difs/modles/video.modle';
import { DataSelectorService } from './../../../core/services/data-selector.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { SongInfo } from './../../../difs/song-info';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as AppActions from '../../../state/actions/app.actions'
import { AppStateName } from 'app/state/app.state';

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.scss']
})
export class VideoFormComponent implements OnInit {

  videoURLControl = new FormControl('');
  displayNmaeCnontrol = new FormControl('');
  playlist$: Observable<SongInfo[]>;

  constructor(private store: Store<any>,
    private playlistInfoService: PlaylistInfoService) {
  }

  ngOnInit(): void {
  }

  doAddVideo(): void {
    // const video: VideoModle = {
    //   tag:this.parseURLToTag(url)
    // }
    // this.playlistInfoService.add();

    // const url: string = this.videoURLControl.value;
    // const newVideo: VideoModle = {
    //   id
    //   songName: this.displayNmaeCnontrol.value,
    //   songTag: this.parseURLToTag(url),
    // }
    // this.store.dispatch(AppActions.addSong({ song: newVideo }));
  }

  parseURLToTag(url: string): string {
    const tag = url.split('=')[1].split('&')[0];
    return tag;
  }

}
