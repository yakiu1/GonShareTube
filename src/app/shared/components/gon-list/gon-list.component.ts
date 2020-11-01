import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { GonListData } from "./../../../difs/gon-list-data";
@Component({
  selector: "app-gon-list",
  templateUrl: "./gon-list.component.html",
  styleUrls: ["./gon-list.component.scss"],
})
export class GonListComponent implements OnInit, OnChanges {
  constructor() {}
  @Input() listData: GonListData[];

  clickedObj = {};

  gonListData = [
    { name: "第一首音樂" },
    { name: "第二首音樂" },
    { name: "第三首音樂" },
    { name: "第四首音樂" },
    { name: "第五首音樂" },
    { name: "第六首音樂" },
    { name: "第七首音樂" },
    { name: "第八首音樂" },
    {
      name:
        "第123456789789123456789789123456789789123456789789123456789789123456789789123456789789123456789789123456789789123456789789123456789789123456789789123456789789123456789789首音樂",
    },
  ];

  ngOnChanges(): void {
    // this.gonListData = [];
    // if (this.listData) {
    // this.gonListData = this.listData;

    this.gonListData.forEach((data, index) => {
      this.clickedObj[`item_${index}`] = false;
    });
    // }
  }

  ngOnInit(): void {
    // this.gonListData = [];
    // if (this.listData) {
    // this.gonListData = this.listData;

    this.gonListData.forEach((data, index) => {
      this.clickedObj[`item_${index}`] = false;
    });
    // }
  }

  listClick(index) {
    const keys = Object.keys(this.clickedObj);
    keys.forEach((element) => {
      this.clickedObj[element] = false;
    });
    this.clickedObj[`item_${index}`] = true;
  }
}
