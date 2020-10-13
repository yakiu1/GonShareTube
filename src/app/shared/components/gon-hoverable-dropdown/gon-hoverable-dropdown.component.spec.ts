import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GonHoverableDropdownComponent } from './gon-hoverable-dropdown.component';

describe('GonHoverableDropdownComponent', () => {
  let component: GonHoverableDropdownComponent;
  let fixture: ComponentFixture<GonHoverableDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GonHoverableDropdownComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GonHoverableDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
