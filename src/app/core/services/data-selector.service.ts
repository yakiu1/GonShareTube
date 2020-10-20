import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppStateName } from '../../state/app.state';

@Injectable({
  providedIn: 'root'
})
export class DataSelectorService {

  constructor(private Store: Store<any>) { }

  getStoreData(data: AppStateName) {
    return (): Observable<any> => {
      return this.Store.select(state => state.appState[data]);
    };
  }
}
