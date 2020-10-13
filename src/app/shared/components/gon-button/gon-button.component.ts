import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-gon-button',
  templateUrl: './gon-button.component.html',
  styleUrls: ['./gon-button.component.scss']
})
export class GonButtonComponent implements OnInit {

  @Input() btnText;
  @Output() clickEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  doClick(): void {
    console.log('dosomething');
    this.clickEvent.emit(this.btnText);
  }
}
