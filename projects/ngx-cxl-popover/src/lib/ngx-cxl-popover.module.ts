import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxCxlPopoverContainerComponent } from './ngx-cxl-popover-container/ngx-cxl-popover-container.component';
import { NgxCxlPopoverDirective } from './ngx-cxl-popover.directive';
import { NgxCxlPopoverService } from './ngx-cxl-popover.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    NgxCxlPopoverContainerComponent,
    NgxCxlPopoverDirective,

  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [
    NgxCxlPopoverDirective
  ],
  providers:[NgxCxlPopoverService]
})
export class NgxCxlPopoverModule { }
