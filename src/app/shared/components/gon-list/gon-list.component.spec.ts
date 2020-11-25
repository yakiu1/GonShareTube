import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GonListComponent } from './gon-list.component';

describe('GonListComponent', () => {
  let component: GonListComponent;
  let fixture: ComponentFixture<GonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GonListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
