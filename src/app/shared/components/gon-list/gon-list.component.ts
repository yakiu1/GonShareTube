


import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from "@angular/core";
import { GonListData } from "./../../../difs/gon-list-data";
@Component({
  selector: "app-gon-list",
  templateUrl: "./gon-list.component.html",
  styleUrls: ["./gon-list.component.scss"],
})
export class GonListComponent implements  OnChanges {
  constructor() {}
  @Input() listData: GonListData[];
  @Output() clickData = new EventEmitter<{index:number,data:GonListData}>();
  
  currentClickIndex:number = -1;
  gonListData = [];
  
  ngOnChanges(): void {
    this.gonListData = this.listData;
   }
  
  listClick(index,data:GonListData) {
    this.currentClickIndex = index;
    this.clickData.emit({index:index,data:data});
  }
}

