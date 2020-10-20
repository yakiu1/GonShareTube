import { initialState } from './../../state/reducers/app.reducer';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { PlayListComponent } from './play-list.component';

describe('PlayListComponent', () => {
  let component: PlayListComponent;
  let fixture: ComponentFixture<PlayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayListComponent],
      providers: [provideMockStore({ initialState })],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
