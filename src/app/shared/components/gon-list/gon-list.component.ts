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
  @Output() clickData = new EventEmitter<Object>();

  clickedObj = {};
  gonListData = [];
  
  //資料改成父元件傳入 所以用onChanges
  ngOnChanges(): void {
    this.gonListData = [];
    if (this.listData) {
    this.gonListData = this.listData;

    this.gonListData.forEach((data, index) => {
      this.clickedObj[`item_${index}`] = false;
    });
    }
  }

  listClick(index,data:GonListData) {
    const obj = {};
    obj[`index`] = index;
    obj[`name`] = data.name
    const keys = Object.keys(this.clickedObj);
    keys.forEach((element) => {
      this.clickedObj[element] = false;
    });
    this.clickedObj[`item_${index}`] = true;
    this.clickData.emit(obj);
  }
}
