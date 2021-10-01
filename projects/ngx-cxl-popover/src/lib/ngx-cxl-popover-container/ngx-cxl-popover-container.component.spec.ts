import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserTestingModule } from '@angular/platform-browser/testing';

import { NgxCxlPopoverContainerComponent } from './ngx-cxl-popover-container.component';


describe('NgxCxlPopoverContainerComponent', () => {
  let component: NgxCxlPopoverContainerComponent;
  let fixture: ComponentFixture<NgxCxlPopoverContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[BrowserTestingModule,NoopAnimationsModule],
      declarations: [ NgxCxlPopoverContainerComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCxlPopoverContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(()=>{
    fixture.destroy();
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should style customize when #width and #height changed',()=>{
    component.width = 100;
    component.height = 100;
    expect(component.getCustomizedStyle().width.toString()).toContain(component.width.toString());
    expect(component.getCustomizedStyle().height.toString()).toContain(component.height.toString());
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.ngx-cxl-popover-container')).styles.width).toContain(component.width.toString());
    expect(fixture.debugElement.query(By.css('.ngx-cxl-popover-container')).styles.height).toContain(component.height.toString());
  })
});
