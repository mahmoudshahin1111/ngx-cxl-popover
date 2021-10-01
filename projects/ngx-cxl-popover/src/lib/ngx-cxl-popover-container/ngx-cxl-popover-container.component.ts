import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostBinding, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { of, Subscription, timer } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
@Component({
  selector: 'ngx-cxl-popover-container',
  templateUrl: './ngx-cxl-popover-container.component.html',
  styleUrls: ['./ngx-cxl-popover-container.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1
      })),
      state('closed', style({
        opacity: 0
      })),
      transition('open <=> closed', [animate('{{animationDelay}}')])
    ])
  ]
})
export class NgxCxlPopoverContainerComponent implements OnInit, OnDestroy {
  title: string;
  content: string;
  titleTemplate: TemplateRef<any> | null;
  contentTemplate: TemplateRef<any> | null;
  width: number;
  height: number;
  opened: boolean;
  animation: boolean;
  animationDelay: number;
  @ViewChild('contentTemp', { static: true }) contentTempRef: ElementRef | null;
  constructor() {
    this.titleTemplate = null;
    this.contentTemplate = null;
    this.title = '';
    this.content = '';
    this.contentTempRef = null;
    this.width = 200;
    this.height = 200;
    this.opened = false;
    this.animation = true;
    this.animationDelay = 100;
  }
  ngOnDestroy(): void {

  }
  ngOnInit(): void {

  }
  enableScroll() {
    const element: HTMLDivElement = this.contentTempRef?.nativeElement;
    element.style.overflowY = 'scroll';
  }
  disableScroll() {
    const element: HTMLDivElement = this.contentTempRef?.nativeElement;
    element.style.overflowY = 'hidden';
  }
  scroll(scrollOptions: ScrollToOptions) {
    if (!this.contentTempRef) return;
    const element = this.contentTempRef.nativeElement as HTMLElement;
    element.scrollBy(scrollOptions);
  }
  getCustomizedStyle() {
    return {
      width: `${this.width}px`,
      height: `${this.height}px`
    }
  }
  open() {
    return of(null).pipe(delay(this.animation ? this.animationDelay : 0), tap((e) => {
      this.opened = true;
    }));
  }
  close() {
    return of(null).pipe(tap((e) => {
      this.opened = false;
    }), delay(this.animation ? this.animationDelay : 0))
  }

}
