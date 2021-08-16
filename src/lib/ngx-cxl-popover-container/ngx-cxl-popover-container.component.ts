import { Component, HostBinding, OnInit, TemplateRef } from '@angular/core';

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
  constructor() {
    this.titleTemplate = null;
    this.contentTemplate = null;
    this.title = '';
    this.content = '';
   }

  ngOnInit(): void {
  }


}
