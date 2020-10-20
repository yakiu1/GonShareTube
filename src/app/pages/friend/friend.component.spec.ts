import { initialState } from './../../state/reducers/app.reducer';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { FriendComponent } from './friend.component';

describe('FriendComponent', () => {
  let component: FriendComponent;
  let fixture: ComponentFixture<FriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FriendComponent],
      providers: [provideMockStore({ initialState })],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
