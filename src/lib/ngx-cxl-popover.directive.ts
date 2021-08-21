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
  @Input() enableScroll: boolean;
  @Input() scrollSpeed: number;
  @Input() width: number | null;
  @Input() height: number | null;
  @Input() popoverTitle: string;
  @Input() popoverContent: string;
  @Input() titleTemplate: TemplateRef<any> | null;
  @Input() contentTemplate: TemplateRef<any> | null;
  @Input() placementDirection: PlacementDirectionsEnum;
  private _popoverComponentFactory: ComponentFactory<NgxCxlPopoverContainerComponent>;
  private _popoverComponentRef: ComponentRef<NgxCxlPopoverContainerComponent> | null;
  private _additionalDistance: number;
  private _isHidden: boolean;
  private _documentBodyOverflowY: string;
  constructor(
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.enableScroll = true;
    this.scrollSpeed = 10;
    this._documentBodyOverflowY = document.body.style.overflowY;
    this.width = null;
    this.height = null;
    this._isHidden = false;
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
  @HostListener('wheel', ['$event'])
  handleScroll(e: WheelEvent) {
    if (!this._popoverComponentRef || this._isHidden || !this.enableScroll)
      return;
    const DeltaY = e.deltaY * (this.scrollSpeed / 100);
    this._popoverComponentRef.instance.scroll({
      behavior: 'auto',
      top: DeltaY,
    });
  }
  @HostListener('mouseenter', ['$event'])
  handleOnMouseEnter(e: MouseEvent) {
    this._isHidden = false;
    this.showPopover(e.clientX, e.clientY);
    if (this.enableScroll) {
      this.disableBodyScroll();
    }
  }
  @HostListener('mouseleave', ['$event'])
  handleOnMouseLeave(e: MouseEvent) {
    this._isHidden = true;
    this.hidePopover();
    if (this.enableScroll) {
      this.enableBodyScroll();
    }
  }
  private showPopover(mouseX: number, mouseY: number) {
    this.createComponent();
    this.setFixedPositionOnPopover();
    if (this.isCanBeOnTheRight(mouseX)) {
      this.displayOnTheRight(mouseX);
    } else if (this.isCanBeOnTheLeft(mouseX)) {
      this.displayOnTheLeft(mouseX);
    } else {
      this.isCanBeOnTheRight(mouseX);
    }

    if (this.isCanBeOnTheTop(mouseY)) {
      this.displayOnTheTop(mouseY);
    } else if (this.isCanBeOnTheBottom(mouseY)) {
      this.displayOnTheBottom(mouseY);
    } else {
      this.displayOnTheBottom(mouseY);
    }
  }
  private createComponent() {
    this._popoverComponentRef =
      this.viewContainerRef.createComponent<NgxCxlPopoverContainerComponent>(
        this._popoverComponentFactory
      );
    this._popoverComponentRef.instance.title = this.popoverTitle;
    this._popoverComponentRef.instance.content = this.popoverContent;
    this._popoverComponentRef.instance.titleTemplate = this.titleTemplate;
    this._popoverComponentRef.instance.contentTemplate = this.contentTemplate;
  }
  private setFixedPositionOnPopover() {
    if (!this._popoverComponentRef) return;
    const nativeElement: HTMLElement =
      this._popoverComponentRef.location.nativeElement;
    nativeElement.style.position = 'fixed';
    nativeElement.style.zIndex = '1000';
  }
  private displayOnTheLeft(startX: number) {
    if (!this._popoverComponentRef) return;
    const nativeElement: HTMLElement =
      this._popoverComponentRef.location.nativeElement;
    const offsetRight = nativeElement.offsetLeft - nativeElement.offsetWidth;
    nativeElement.style.left = `${
      offsetRight + startX - this._additionalDistance
    }px`;
  }
  private displayOnTheRight(startX: number) {
    if (!this._popoverComponentRef) return;
    const nativeElement: HTMLElement =
      this._popoverComponentRef.location.nativeElement;
    nativeElement.style.left = `${startX + this._additionalDistance}px`;
  }
  private displayOnTheTop(startX: number) {
    if (!this._popoverComponentRef) return;
    const nativeElement: HTMLElement =
      this._popoverComponentRef.location.nativeElement;
    nativeElement.style.top = `${
      startX - nativeElement.offsetHeight - this._additionalDistance
    }px`;
  }
  private displayOnTheBottom(startX: number) {
    if (!this._popoverComponentRef) return;
    const nativeElement: HTMLElement =
      this._popoverComponentRef.location.nativeElement;
  }
  private disableBodyScroll() {
    document.body.style.overflowY = 'hidden';
  }
  private enableBodyScroll() {
    document.body.style.overflowY = this._documentBodyOverflowY;
  }

  private hidePopover() {
    this._popoverComponentRef?.destroy();
    this._popoverComponentRef = null;
  }
  private isCanBeOnTheRight(mouseX: number) {
    if (!this._popoverComponentRef) return;
    const nativeElement: HTMLElement =
      this._popoverComponentRef.location.nativeElement;
    const availableDistance = window.screen.availWidth - mouseX;
    const elementWidth = nativeElement.offsetWidth + this._additionalDistance;
    return availableDistance >= elementWidth;
  }
  private isCanBeOnTheLeft(mouseX: number) {
    if (!this._popoverComponentRef) return;
    const nativeElement: HTMLElement =
      this._popoverComponentRef.location.nativeElement;
    const elementWidth = nativeElement.offsetWidth + this._additionalDistance;
    const availableDistance = mouseX;
    return availableDistance >= elementWidth;
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
    const availableDistance = window.screen.availHeight - mouseY;
    return (
      availableDistance >= nativeElement.offsetHeight + this._additionalDistance
    );
  }
}
