import { GonListData } from './../../../difs/gon-list-data';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-gon-button-list',
  templateUrl: './gon-button-list.component.html',
})
export class GonButtonListComponent implements OnInit {

  @Input() listItem: GonListData[];
  @ViewChild('list', { static: true }) listRef: ElementRef;

  @Output() addEvent = new EventEmitter();
  @Output() doBtnClickEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  doClickAdd(): void {

    const listLenth = this.listItem.length;
    const newPlaylist: GonListData = {
      ...this.listItem[listLenth],
      index: listLenth,
      name: (listLenth + 1).toString()
    }

    if (listLenth > 9) {
      return;
    }

    this.listItem = [... this.listItem, newPlaylist];
    this.addEvent.emit(newPlaylist);
  }

  doClickBtn(index: number): void {
    this.doBtnClickEvent.emit(index);
  }
}
