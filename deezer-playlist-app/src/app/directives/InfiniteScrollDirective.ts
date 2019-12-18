import { Directive, AfterViewInit, ElementRef, Input } from '@angular/core';
import { fromEvent } from 'rxjs';
import { pairwise, exhaustMap, map, filter, startWith } from 'rxjs/operators';


interface ScrollPosition {
    sH: number;
    sT: number;
    cH: number;
};

const DEFAULT_SCROLL_POSITION: ScrollPosition = {
    sH: 0,
    sT: 0,
    cH: 0
};

@Directive({
    selector: '[appInfiniteScroller]'
})
export class InfiniteScrollerDirective implements AfterViewInit {

    private scrollEvent$;

    private userScrolledDown$;

    private requestOnScroll$;

    @Input()
    scrollCallback;

    @Input()
    immediateCallback;

    @Input()
    scrollPercent = 70;

    @Input()
    useRootDocumentScroll = false;

    constructor(private elm: ElementRef) { }

    ngAfterViewInit() {

        this.registerScrollEvent();

        this.streamScrollEvents();

        this.requestCallbackOnScroll();

    }

    private registerScrollEvent() {
        const element = this.useRootDocumentScroll ? document : this.elm.nativeElement;
        this.scrollEvent$ = fromEvent(element, 'scroll');

    }

    private streamScrollEvents() {
        this.userScrolledDown$ = this.scrollEvent$.pipe(
            map((e: any): ScrollPosition => {
                return {
                    sH: e.target.scrollingElement.scrollHeight,
                    sT: e.target.scrollingElement.scrollTop,
                    cH: e.target.scrollingElement.clientHeight
                }
            }),
            pairwise(),
            filter(positions => this.isUserScrollingDown(positions) && this.isScrollExpectedPercent(positions[1])));
    }

    private requestCallbackOnScroll() {

        this.requestOnScroll$ = this.userScrolledDown$;

        if (this.immediateCallback) {
            this.requestOnScroll$ = this.requestOnScroll$.pipe(
                startWith([DEFAULT_SCROLL_POSITION, DEFAULT_SCROLL_POSITION]));
        }

        this.requestOnScroll$.pipe(
            exhaustMap(() => { return this.scrollCallback(); }))
            .subscribe(() => { });

    }

    private isUserScrollingDown = (positions) => {
        return positions[0].sT < positions[1].sT;
    }

    private isScrollExpectedPercent = (position) => {
        return ((position.sT + position.cH) / position.sH) > (this.scrollPercent / 100);
    }

}