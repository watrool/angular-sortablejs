import { ElementRef, OnInit, OnChanges, OnDestroy, NgZone, SimpleChanges } from '@angular/core';
export declare class SortablejsDirective implements OnInit, OnChanges, OnDestroy {
    private element;
    private zone;
    private _items;
    private _options;
    private _sortable;
    runInsideAngular: boolean;
    constructor(element: ElementRef, zone: NgZone);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private readonly options;
    private proxyEvent(eventName, event);
    private readonly overridenOptions;
}
