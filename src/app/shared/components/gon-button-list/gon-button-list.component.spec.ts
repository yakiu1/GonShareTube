import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GonButtonListComponent } from './gon-button-list.component';

describe('GonButtonListComponent', () => {
  let component: GonButtonListComponent;
  let fixture: ComponentFixture<GonButtonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GonButtonListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GonButtonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
