import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GonListItemComponent } from './gon-list-item.component';

describe('GonListItemComponent', () => {
  let component: GonListItemComponent;
  let fixture: ComponentFixture<GonListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GonListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GonListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
