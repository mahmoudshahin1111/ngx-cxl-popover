import { Component, ElementRef, HostBinding, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-cxl-popover-container',
  templateUrl: './ngx-cxl-popover-container.component.html',
  styleUrls: ['./ngx-cxl-popover-container.component.scss']
})
export class NgxCxlPopoverContainerComponent implements OnInit {
  public title:string;
  public content:string;
  public titleTemplate:TemplateRef<any> | null;
  public contentTemplate:TemplateRef<any> | null;
  public width:number;
  public height:number;
  @ViewChild('contentTemp',{static:true}) contentTempRef:ElementRef|null;
  constructor() {
    this.titleTemplate = null;
    this.contentTemplate = null;
    this.title = '';
    this.content = '';
    this.contentTempRef = null;
    this.width = 200;
    this.height = 200;
   }

  ngOnInit(): void {
  
  }
  scroll(scrollOptions:ScrollToOptions){
    if(!this.contentTempRef) return;
    const element = this.contentTempRef.nativeElement as HTMLElement;
    element.scrollBy(scrollOptions);
  }
  getCustomizedStyle(){
    return {
      width:`${this.width}px`,
      height:`${this.height}px`
    }
  }
}
