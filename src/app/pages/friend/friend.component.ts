import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AppActions from '../../state/actions/app.actions'
@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {

  currentGroup = new FormControl('');
  constructor(
    private store: Store<any>
  ) { }

  ngOnInit(): void {
  }

  doEnterRoom(): void {
    if (this.currentGroup.value !== '') {
      this.store.dispatch(AppActions.setGroup({ currentGroup: this.currentGroup.value }))
    }
  }

}
