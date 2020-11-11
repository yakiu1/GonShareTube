


import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from "@angular/core";
import { GonListData } from "./../../../difs/gon-list-data";
import { ListDataType } from "app/difs/list-data-type.enum";
import {FormControl, Validators } from '@angular/forms';
@Component({
  selector: "app-gon-list",
  templateUrl: "./gon-list.component.html",
  styleUrls: ["./gon-list.component.scss"],
})
export class GonListComponent implements  OnChanges {
  constructor() {}

  @Input() listDataType:String;
  @Input() listData: GonListData[];
  @Input() showAddBtn:boolean;
  @Input() showEditBtn:boolean;

  @Output() doClickData = new EventEmitter<{index:number,data:GonListData}>();
  @Output() doAddData = new EventEmitter<{index:number,data:GonListData}>();
  @Output() doDeleteData = new EventEmitter<Number>();
  @Output() clickData = new EventEmitter<{index:number,data:GonListData}>();
  @Output() addDataBtn = new EventEmitter<{index:number,data:GonListData}>();
  @Output() deleteDataBtn = new EventEmitter<Number>();



  currentClickIndex:number = -1;
  gonListData = [];
  addBtnClicked = false;
  editBtnClicked = false;
  value = new FormControl('',Validators.required);
  name = new FormControl('',Validators.required);
  placeHolder:string[] = [];
  formKeys = ['name','value'];


  ngOnChanges(): void {
    this.gonListData = this.listData;
    switch(this.listDataType){
      case ListDataType.YTPlaylist:
        this.placeHolder.push('Text');
        this.placeHolder.push('Url');
      break;
    }
  }

  clickListData(index,data:GonListData) {
    this.currentClickIndex = index;
    this.doClickData.emit({index:index,data:data});
  }

  clickAddBtn(){

    this.addBtnClicked = true;
  }

  clickCancelBtn(){
    this.setText('','');
    this.addBtnClicked = false;
  }

  clickEditBtn(){
    this.editBtnClicked = !this.editBtnClicked;
  }

  clickDeleteBtn(i){
    this.doDeleteData.emit(i)
  }

  clickConfirmBtn(){
    const data:GonListData= {
      index: this.gonListData.length+1,
      name: this.name.value,
      value: this.value.value,
      description: "",
    }
    this.doAddData.emit({index:this.gonListData.length+1,data:data})
    this.setText('','');
    this.addBtnClicked = false;
  }

  setText(name,value){
    this.name.setValue(name);
    this.value.setValue(value);
  }
}

