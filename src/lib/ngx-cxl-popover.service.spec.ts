import { TestBed } from '@angular/core/testing';

import { NgxCxlPopoverService } from './ngx-cxl-popover.service';

describe('NgxCxlPopoverService', () => {
  let service: NgxCxlPopoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxCxlPopoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
