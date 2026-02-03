import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import flatpickr from 'flatpickr';

@Directive({
  selector: '[appFlatpickr]',
  standalone: true
})
export class FlatpickrDirective implements OnInit, OnDestroy {

  private instance: any;

  constructor(private el: ElementRef<HTMLInputElement>) {
    console.log('FlatpickrDirective constructor');
  }

  ngOnInit(): void {
    this.instance = flatpickr(this.el.nativeElement, {
      altInput: true,
      altFormat: 'F j, Y',
      dateFormat: 'Y-m-d',
      disableMobile: true
    });
  }

  ngOnDestroy(): void {
    this.instance?.destroy();
  }
}
