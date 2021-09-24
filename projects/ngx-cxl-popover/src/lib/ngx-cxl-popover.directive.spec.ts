import { CommonModule } from '@angular/common';
import { Component, DebugElement, Inject } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { NgxCxlPopoverContainerComponent } from './ngx-cxl-popover-container/ngx-cxl-popover-container.component';
import { NgxCxlPopoverDirective } from './ngx-cxl-popover.directive';
import { NgxCxlPopoverModule } from './ngx-cxl-popover.module';

@Component({
  template: `
    <h1 ngxCxlPopover popoverTitle="test" popoverContent="test">Test</h1>
    `
})
class HostComponent { }


describe('NgxCxlPopoverDirective', () => {
  let hostComponent: ComponentFixture<HostComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NgxCxlPopoverDirective,
        HostComponent,
        NgxCxlPopoverContainerComponent
      ],
      imports: [
        BrowserDynamicTestingModule,
        BrowserTestingModule
      ]
    }).overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [NgxCxlPopoverContainerComponent] } }).compileComponents();
    hostComponent = TestBed.createComponent(HostComponent);
    hostComponent.detectChanges();
  });
  afterEach(async () => {
    const debugElement: DebugElement = hostComponent.debugElement.query(By.directive(NgxCxlPopoverDirective));
    debugElement.nativeElement.dispatchEvent(new MouseEvent('mouseleave'));
  })
  it('should create an instance', () => {
    const elementsHasDirective = hostComponent.debugElement.queryAll(By.directive(NgxCxlPopoverDirective));
    expect(elementsHasDirective.length > 0).toBeTruthy();
  });
  it("PopoverContainer display when mouse entered and hidden when mouse leaved", () => {
    const debugElement: DebugElement = hostComponent.debugElement.query(By.directive(NgxCxlPopoverDirective));
    debugElement.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    let popoverComponentDebugElement: DebugElement = hostComponent.debugElement.query(By.directive(NgxCxlPopoverContainerComponent));
    expect(popoverComponentDebugElement).toBeDefined();
    debugElement.nativeElement.dispatchEvent(new MouseEvent('mouseleave'));
    popoverComponentDebugElement = hostComponent.debugElement.query(By.directive(NgxCxlPopoverContainerComponent));
    expect(popoverComponentDebugElement).toBeNull();
  });
  it("title and content appeared correctly in the component", () => {
    const debugElement: DebugElement = hostComponent.debugElement.query(By.directive(NgxCxlPopoverDirective));
    debugElement.nativeElement.dispatchEvent(new MouseEvent('mouseenter'));
    let popoverComponentDebugElement: DebugElement = hostComponent.debugElement.query(By.directive(NgxCxlPopoverContainerComponent));
    expect(popoverComponentDebugElement).toBeDefined();
    const popoverComponent = (popoverComponentDebugElement.componentInstance as NgxCxlPopoverContainerComponent);
    expect(popoverComponent.title).toEqual("test");
    expect(popoverComponent.content).toEqual("test");
  });

});
