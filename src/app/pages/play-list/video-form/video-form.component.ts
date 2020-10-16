import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { SongInfo } from './../../../difs/song-info';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as AppActions from '../../../state/actions/app.actions'

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.scss']
})
export class VideoFormComponent implements OnInit {

  videoURLControl = new FormControl('');
  displayNmaeCnontrol = new FormControl('');
  $playlist: Observable<SongInfo[]>;

  constructor(private store: Store<any>) {
    this.$playlist = store.select(state =>
      state.appState.playlist
    );
  }

  ngOnInit(): void {
  }

  doAddVideo() {
    const url: string = this.videoURLControl.value;
    const newVideo: SongInfo = {
      songName: this.displayNmaeCnontrol.value,
      songTag: this.parseURLToTag(url),
    }
    this.$playlist

    this.store.dispatch(AppActions.addSong({ song: newVideo }));
  }

  parseURLToTag(url: string): string {
    const tag = url.split('=')[1].split('&')[0];
    console.log(tag,'<=================tags')
    return tag;
  }

}
