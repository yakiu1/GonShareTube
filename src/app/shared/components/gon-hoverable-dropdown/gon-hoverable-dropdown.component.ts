import { SongInfo } from './../../../difs/song-info';
import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-gon-hoverable-dropdown',
  templateUrl: './gon-hoverable-dropdown.component.html',
  styleUrls: ['./gon-hoverable-dropdown.component.scss']
})
export class GonHoverableDropdownComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() playList: SongInfo[];

  playListWithDisplayName = [];

  constructor() { }

  ngAfterViewInit(): void {
  }

  ngOnChanges(): void {
    this.playListWithDisplayName = [];
    if (this.playList) {
      this.playList.forEach(song => {
        const displayName = song.songName.length > 20 ?
          song.songName.substring(0, 24) + '...' :
          song.songName;
        const _tempSong: SongInfo = {
          songName: song.songName,
          songTag: song.songTag,
          displayName: displayName

        }
        this.playListWithDisplayName.push(_tempSong);
      })
    }
  }

  ngOnInit(): void {
  }

}
