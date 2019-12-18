import { Directive, AfterViewInit, ElementRef, Input, HostBinding } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

@Directive({
    selector: '[appCollapseOnScroll]'
})
export class CollapseOnScrollDirective implements AfterViewInit {

    @Input()
    scrollpx;

    isCollapsed = false;
    wait = false;

    @HostBinding('class.collapsed')
    public get checkCollapsed(): boolean {
        return this.isCollapsed;
    }

    constructor() { }

    ngAfterViewInit() {

        fromEvent(window, "scroll").pipe(
            map(() => window.pageYOffset),
            debounceTime(10)
        ).subscribe(y => {
            if (y >= this.scrollpx) {
                this.isCollapsed = true;
            } else if (y < this.scrollpx) {
                this.isCollapsed = false;
            }
        });

    }


}