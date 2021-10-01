import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxCxlPopoverModule } from 'ngx-cxl-popover';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    NgxCxlPopoverModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
