


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

  @Input() listDataType:String;//判斷list內Data的型別
  @Input() listData: GonListData[];
  @Input() showAddBtn:boolean;//判斷是否要顯示 新增("+")按鈕
  @Input() showEditBtn:boolean;//判斷是否要顯示 編輯按鈕
  @Output() doClickData = new EventEmitter<{index:number,data:GonListData}>();//將資料傳出去
  @Output() doAddData = new EventEmitter<{index:number,data:GonListData}>();//新增資料
  @Output() doDeleteData = new EventEmitter<Number>();//刪除資料
  
  currentClickIndex:number = -1;
  gonListData = [];
  addBtnClicked = false;//是否點擊新增("+")符號
  editBtnClicked = false;//是否點擊編輯按鈕
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

  clickEditBtn(){
    this.editBtnClicked = !this.editBtnClicked;
  }

  clickDeleteBtn(i){
    this.doDeleteData.emit(i)
  }

  setText(name,value){
    this.name.setValue(name);
    this.value.setValue(value);
  }
}

