import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCxlPopoverComponent } from './ngx-cxl-popover.component';

describe('NgxCxlPopoverComponent', () => {
  let component: NgxCxlPopoverComponent;
  let fixture: ComponentFixture<NgxCxlPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxCxlPopoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCxlPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
