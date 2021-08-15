import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCxlPopoverContainerComponent } from './ngx-cxl-popover-container.component';

describe('NgxCxlPopoverContainerComponent', () => {
  let component: NgxCxlPopoverContainerComponent;
  let fixture: ComponentFixture<NgxCxlPopoverContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxCxlPopoverContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCxlPopoverContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
