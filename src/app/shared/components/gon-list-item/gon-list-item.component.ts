import { SongInfo } from './../../../difs/song-info';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-gon-list-item',
  templateUrl: './gon-list-item.component.html',
  styleUrls: ['./gon-list-item.component.scss']
})
export class GonListItemComponent implements OnInit {

  @Output() delete = new EventEmitter<SongInfo>();

  @Input() songName: SongInfo;

  constructor() { }

  ngOnInit(): void {
  }

  doDeleteSong(): void {
    this.delete.emit(this.songName);
  }
}
