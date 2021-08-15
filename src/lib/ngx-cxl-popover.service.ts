import { ComponentFactoryResolver, ComponentRef, Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ITriggerEvent } from './api/itrigger-event';


@Injectable({
  providedIn: 'root'
})
export class NgxCxlPopoverService {
  private _triggered$: Subject<ITriggerEvent> = new Subject<ITriggerEvent>();
  private _onTriggered: Observable<ITriggerEvent> =
    this._triggered$.asObservable();
  constructor(private componentFactoryResolver:ComponentFactoryResolver) {
    console.log(this.componentFactoryResolver);
    
  }
  trigger(e: ITriggerEvent) {
    this._triggered$.next(e);
  }
  onTrigger() {
    return this._onTriggered;
  }
}
