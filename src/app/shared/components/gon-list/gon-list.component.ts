import { Component, Input, Output, EventEmitter } from "@angular/core";
import { GonListData } from "./../../../difs/gon-list-data";
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: "app-gon-list",
  templateUrl: "./gon-list.component.html",
  styleUrls: ["./gon-list.component.scss"],
})
export class GonListComponent {
  constructor() { }

  @Input() listDataType: String;
  @Input() set listData(value) {
    this._listData = value;
  }
  @Input() showAddBtn: boolean;
  @Input() showEditBtn: boolean;

  @Output() doClickData = new EventEmitter<{ index: number, data: GonListData }>();
  @Output() doAddData = new EventEmitter<GonListData>();
  @Output() doDeleteData = new EventEmitter<Number>();
  @Output() clickData = new EventEmitter<{ index: number, data: GonListData }>();
  @Output() addDataBtn = new EventEmitter<{ index: number, data: GonListData }>();
  @Output() deleteDataBtn = new EventEmitter<Number>();

  _listData: GonListData[] = [];

  currentClickIndex: number = -1;
  addBtnClicked = false;
  editBtnClicked = false;
  value = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  placeHolder: string[] = [];
  formKeys = ['name', 'value'];


  nameInputText = 'Video Name';
  valueInputText = 'Video Url';

  clickListData(index, data: GonListData) {
    this.currentClickIndex = index;
    this.doClickData.emit({ index: index, data: data });
  }

  clickAddBtn() {

    this.addBtnClicked = true;
  }

  clickCancelBtn() {
    this.setText('', '');
    this.addBtnClicked = false;
  }

  clickEditBtn() {
    this.editBtnClicked = !this.editBtnClicked;
  }

  clickDeleteBtn(i) {
    this.doDeleteData.emit(i)
  }

  clickConfirmBtn(event) {
    const data: GonListData = {
      index: 0,
      name: event.name,
      value: event.value,
      description: "",
    }
    this.doAddData.emit(data)
    this.setText('', '');
    this.addBtnClicked = false;
  }

  setText(name, value) {
    this.name.setValue(name);
    this.value.setValue(value);
  }
}

