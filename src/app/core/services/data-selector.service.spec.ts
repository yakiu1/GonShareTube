import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../state/reducers/app.reducer';

import { DataSelectorService } from './data-selector.service';

fdescribe('DataSelectorService', () => {
  let service: DataSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    });
    service = TestBed.inject(DataSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
