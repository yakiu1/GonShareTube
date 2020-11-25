import { Component, OnInit } from '@angular/core';
// import { version } from '../../../../package.json';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit {
  version = '0.1.5';
  constructor() { }


  ngOnInit(): void {


  }

}
