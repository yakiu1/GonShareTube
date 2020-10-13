import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GonButtonComponent } from './gon-button.component';

describe('GonButtonComponent', () => {
  let component: GonButtonComponent;
  let fixture: ComponentFixture<GonButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GonButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GonButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
