import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { NgxCxlPopoverContainerComponent } from './ngx-cxl-popover-container/ngx-cxl-popover-container.component';

@Directive({
  selector: '[NgxCxlPopover]',
})
export class NgxCxlPopoverDirective implements OnInit {
  @Input() popoverTitle: string;
  @Input() popoverContent: string;
  @Input() titleTemplate:TemplateRef<any> | null;
  @Input() contentTemplate:TemplateRef<any> | null;
  private _popoverComponentFactory: ComponentFactory<NgxCxlPopoverContainerComponent>;
  private _popoverComponentRef: ComponentRef<NgxCxlPopoverContainerComponent> | null;
  constructor(
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.titleTemplate = null;
    this.contentTemplate = null;
    this.popoverTitle = '';
    this.popoverContent = '';
    this._popoverComponentRef = null;
    this._popoverComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        NgxCxlPopoverContainerComponent
      );
  }
  ngOnInit(): void {}
  @HostListener('mouseenter')
  handleOnMouseEnter() {
    this.showPopover();
    console.log('mouse entered');
  }
  @HostListener('mouseleave')
  handleOnMouseLeave() {
    this.hidePopover();
    console.log('mouse leaved');
  }
  private showPopover() {
    this._popoverComponentRef =
      this.viewContainerRef.createComponent<NgxCxlPopoverContainerComponent>(
        this._popoverComponentFactory
      );
    this._popoverComponentRef.instance.title = this.popoverTitle;
    this._popoverComponentRef.instance.content = this.popoverContent;
    this._popoverComponentRef.instance.titleTemplate = this.titleTemplate;
    this._popoverComponentRef.instance.contentTemplate = this.contentTemplate;
  }
  private hidePopover() {
    this._popoverComponentRef?.destroy();
    this._popoverComponentRef = null;
  }
}
