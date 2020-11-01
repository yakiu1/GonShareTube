import { GonListData } from './../../../difs/gon-list-data';
import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-gon-button-list',
  templateUrl: './gon-button-list.component.html',
  styleUrls: ['./gon-button-list.component.scss']
})
export class GonButtonListComponent implements OnInit, AfterViewInit {

  @Input() listItem: GonListData[];
  @Output() addEvent = new EventEmitter();
  @ViewChild('list', { static: true }) listRef: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    (this.listRef.nativeElement as HTMLElement).querySelectorAll('button').forEach(btn => {
      btn.classList.add('list-button');
    })
  }

  doClickAdd() {
    this.addEvent.emit();
  }

}
