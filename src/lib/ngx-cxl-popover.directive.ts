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
import { PlacementDirectionsEnum } from './api/placement-direction-enum';
import { NgxCxlPopoverContainerComponent } from './ngx-cxl-popover-container/ngx-cxl-popover-container.component';

@Directive({
  selector: '[NgxCxlPopover]',
})
export class NgxCxlPopoverDirective implements OnInit {
  @Input() popoverTitle: string;
  @Input() popoverContent: string;
  @Input() titleTemplate: TemplateRef<any> | null;
  @Input() contentTemplate: TemplateRef<any> | null;
  @Input() placementDirection: PlacementDirectionsEnum;
  private _popoverComponentFactory: ComponentFactory<NgxCxlPopoverContainerComponent>;
  private _popoverComponentRef: ComponentRef<NgxCxlPopoverContainerComponent> | null;
  private _additionalDistance: number;
  constructor(
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this._additionalDistance = 20;
    this.placementDirection = PlacementDirectionsEnum.right;
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
  @HostListener('mouseenter', ['$event'])
  handleOnMouseEnter(e: MouseEvent) {
    this.showPopover(e.offsetX, e.offsetY);
    console.log('mouse entered');
  }
  @HostListener('mouseleave', ['$event'])
  handleOnMouseLeave(e: MouseEvent) {
    console.log(e.offsetX, e.offsetY);
    this.hidePopover();
    console.log('mouse leaved');
  }
  private showPopover(mouseX: number, mouseY: number) {
    this._popoverComponentRef =
      this.viewContainerRef.createComponent<NgxCxlPopoverContainerComponent>(
        this._popoverComponentFactory
      );
    this._popoverComponentRef.instance.title = this.popoverTitle;
    this._popoverComponentRef.instance.content = this.popoverContent;
    this._popoverComponentRef.instance.titleTemplate = this.titleTemplate;
    this._popoverComponentRef.instance.contentTemplate = this.contentTemplate;
    const nativeElement: HTMLElement =
      this._popoverComponentRef.location.nativeElement;
    nativeElement.style.position = 'fixed';
    nativeElement.style.zIndex = '10000';

    const parentNativeElement: HTMLElement = this.elementRef.nativeElement;
    if (this.isCanBeOnTheRight(mouseX)) {
      nativeElement.style.left = `${mouseX + this._additionalDistance}px`;
    } else if (this.isCanBeOnTheLeft(mouseX)) {
      nativeElement.style.left = `${
        nativeElement.offsetLeft -
        nativeElement.offsetWidth +
        mouseX -
        this._additionalDistance
      }px`;
    } else {
      nativeElement.style.left = `${mouseX + this._additionalDistance}px`;
    }
    if (this.isCanBeOnTheTop(mouseY)) {
      nativeElement.style.bottom = `${mouseY + this._additionalDistance}px`;
    } else if (this.isCanBeOnTheBottom(mouseY)) {
      nativeElement.style.top = `${mouseY + this._additionalDistance}px`;
    } else {
      nativeElement.style.bottom = `${mouseY + this._additionalDistance}px`;
    }
  }

  private hidePopover() {
    this._popoverComponentRef?.destroy();
    this._popoverComponentRef = null;
  }
  private isCanBeOnTheRight(mouseX: number) {
    if (!this._popoverComponentRef) return;
    const nativeElement: HTMLElement =
      this._popoverComponentRef.location.nativeElement;
    const availableDistance = document.body.clientWidth - mouseX;
    return (
      availableDistance >= nativeElement.offsetWidth + this._additionalDistance
    );
  }
  private isCanBeOnTheLeft(mouseX: number) {
    if (!this._popoverComponentRef) return;
    const nativeElement: HTMLElement =
      this._popoverComponentRef.location.nativeElement;
    return mouseX >= nativeElement.offsetWidth + this._additionalDistance;
  }
  private isCanBeOnTheTop(mouseY: number) {
    if (!this._popoverComponentRef) return;
    const nativeElement: HTMLElement =
      this._popoverComponentRef.location.nativeElement;
    const availableDistance = mouseY;
    return (
      availableDistance >= nativeElement.offsetHeight + this._additionalDistance
    );
  }
  private isCanBeOnTheBottom(mouseY: number) {
    if (!this._popoverComponentRef) return;
    const nativeElement: HTMLElement =
      this._popoverComponentRef.location.nativeElement;
    const availableDistance = document.body.clientHeight - mouseY;
    return (
      availableDistance >= nativeElement.offsetHeight + this._additionalDistance
    );
  }
}
