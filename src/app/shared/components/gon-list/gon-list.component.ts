


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
  @Output() clickData = new EventEmitter<{index:number,data:GonListData}>();//將資料傳出去
  @Output() addDataBtn = new EventEmitter<{index:number,data:GonListData}>();//將資料傳出去
  @Output() deleteDataBtn = new EventEmitter<Number>();//將資料傳出去
  
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
    this.clickData.emit({index:index,data:data});
  }

  clickAddBtn(){

    this.addBtnClicked = true;
  }
  
  clickCancelBtn(){
    this.setText('','');
    this.addBtnClicked = false;
  }

  clickConfirmBtn(){
    //資料驗證之後再討論
    // if(this.name.invalid || this.value.invalid){
    //   if(this.name.invalid){
    //     this.placeHolder[0] = '請輸入資料'
    //   }
    //   if(this.value.invalid){
    //     this.placeHolder[1] = '請輸入資料'
    //   }
    // }else{
      const data:GonListData= {
        index: this.gonListData.length+1,
        name: this.name.value,
        value: this.value.value,
        description: "",
      }
      this.addDataBtn.emit({index:this.gonListData.length+1,data:data})
     this.setText('','');
      this.addBtnClicked = false;
    // }

  }

  clickEditBtn(){
    this.editBtnClicked = !this.editBtnClicked;
  }

  clickDeleteBtn(i){
    this.deleteDataBtn.emit(i)
  }

  setText(name,value){
    this.name.setValue(name);
    this.value.setValue(value);
  }
}

