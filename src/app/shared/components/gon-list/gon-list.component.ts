import { Component, Input, Output, EventEmitter } from "@angular/core";
import { GonListData } from "./../../../difs/gon-list-data";
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: "app-gon-list",
  templateUrl: "./gon-list.component.html",
})
export class GonListComponent {
  constructor() { }

  @Input() listDataType: string;
  @Input() set listData(value: GonListData[]) {
    this._listData = value;
  }
  @Input() showAddBtn: boolean;
  @Input() showEditBtn: boolean;

  @Output() doClickData = new EventEmitter<{ index: number, data: GonListData }>();
  @Output() doAddData = new EventEmitter<GonListData>();
  @Output() doDeleteData = new EventEmitter<number>();
  @Output() clickData = new EventEmitter<{ index: number, data: GonListData }>();
  @Output() addDataBtn = new EventEmitter<{ index: number, data: GonListData }>();
  @Output() deleteDataBtn = new EventEmitter<number>();

  _listData: GonListData[] = [];

  currentClickIndex = -1;
  addBtnClicked = false;
  editBtnClicked = false;
  fadeAddRow = false;
  // eslint-disable-next-line @typescript-eslint/unbound-method
  value = new FormControl('', Validators.required);
  // eslint-disable-next-line @typescript-eslint/unbound-method
  name = new FormControl('', Validators.required);
  placeHolder: string[] = [];
  formKeys = ['name', 'value'];


  nameInputText = '影片名稱';
  valueInputText = '影片網址';

  clickListData(index: number, data: GonListData): void {
    this.currentClickIndex = index;
    this.doClickData.emit({ index: index, data: data });
  }

  clickAddBtn(): void {
    this.addBtnClicked = true;
  }

  clickCancelBtn(): void {
    this.setText('', '');
    this.addBtnClicked = false;
  }

  clickEditBtn(): void {
    this.editBtnClicked = !this.editBtnClicked;

  }

  clickDeleteBtn(i: number): void {
    this.doDeleteData.emit(i)
  }

  clickConfirmBtn(event: { name: string, value: string }): void {
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

  setText(name: string, value: string): void {
    this.name.setValue(name);
    this.value.setValue(value);
  }
}

