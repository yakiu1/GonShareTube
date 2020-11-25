import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-gon-button',
  templateUrl: './gon-button.component.html',
})
export class GonButtonComponent implements OnInit {

  @Input() btnText;
  @Input() btnIcon;
  @Output() clickEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  doClick(): void {
    this.clickEvent.emit(this.btnText);
  }
}
