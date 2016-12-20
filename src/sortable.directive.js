"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var index_1 = require('../index');
// Sortable
var Sortable = require('sortablejs');
// original library calls the events in unnatural order
// first the item is added, then removed from the previous array
// this is a temporary event to work this around
// as long as only one sortable takes place at a certain time
// this is enough to have a single `global` event
var onremove;
var SortablejsDirective = (function () {
    function SortablejsDirective(element, zone) {
        this.element = element;
        this.zone = zone;
        this.runInsideAngular = false;
    }
    SortablejsDirective.prototype.ngOnInit = function () {
        var _this = this;
        // onChange???
        if (this.runInsideAngular) {
            this._sortable = new Sortable(this.element.nativeElement, this.options);
        }
        else {
            this.zone.runOutsideAngular(function () {
                _this._sortable = new Sortable(_this.element.nativeElement, _this.options);
            });
        }
    };
    SortablejsDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var optionsChange = changes['_options'];
        if (optionsChange && !optionsChange.isFirstChange()) {
            var previousOptions_1 = optionsChange.previousValue;
            var currentOptions_1 = optionsChange.currentValue;
            Object.keys(currentOptions_1).forEach(function (optionName) {
                if (currentOptions_1[optionName] !== previousOptions_1[optionName]) {
                    // use low-level option setter
                    _this._sortable.option(optionName, currentOptions_1[optionName]);
                }
            });
        }
    };
    SortablejsDirective.prototype.ngOnDestroy = function () {
        this._sortable.destroy();
    };
    Object.defineProperty(SortablejsDirective.prototype, "options", {
        get: function () {
            return Object.assign({}, index_1.SortablejsModule._globalOptions, this._options, this.overridenOptions);
        },
        enumerable: true,
        configurable: true
    });
    SortablejsDirective.prototype.proxyEvent = function (eventName, event) {
        if (this._options && this._options[eventName]) {
            this._options[eventName](event);
        }
    };
    Object.defineProperty(SortablejsDirective.prototype, "overridenOptions", {
        get: function () {
            var _this = this;
            if (this._items) {
                return {
                    onAdd: function (event) {
                        onremove = function (item) {
                            if (_this._items instanceof forms_1.FormArray) {
                                _this._items.insert(event.newIndex, item);
                            }
                            else {
                                _this._items.splice(event.newIndex, 0, item);
                            }
                        };
                        _this.proxyEvent('onAdd', event);
                    },
                    onRemove: function (event) {
                        var item;
                        if (_this._items instanceof forms_1.FormArray) {
                            item = _this._items.at(event.oldIndex);
                            _this._items.removeAt(event.oldIndex);
                        }
                        else {
                            item = _this._items.splice(event.oldIndex, 1)[0];
                        }
                        onremove(item);
                        onremove = null;
                        _this.proxyEvent('onRemove', event);
                    },
                    onUpdate: function (event) {
                        if (_this._items instanceof forms_1.FormArray) {
                            var relocated = _this._items.at(event.oldIndex);
                            _this._items.removeAt(event.oldIndex);
                            _this._items.insert(event.newIndex, relocated);
                        }
                        else {
                            _this._items.splice(event.newIndex, 0, _this._items.splice(event.oldIndex, 1)[0]);
                        }
                        _this.proxyEvent('onUpdate', event);
                    }
                };
            }
            return {};
        },
        enumerable: true,
        configurable: true
    });
    SortablejsDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[sortablejs]'
                },] },
    ];
    /** @nocollapse */
    SortablejsDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.NgZone, },
    ]; };
    SortablejsDirective.propDecorators = {
        '_items': [{ type: core_1.Input, args: ['sortablejs',] },],
        '_options': [{ type: core_1.Input, args: ['sortablejsOptions',] },],
        'runInsideAngular': [{ type: core_1.Input },],
    };
    return SortablejsDirective;
}());
exports.SortablejsDirective = SortablejsDirective;
//# sourceMappingURL=sortable.directive.js.map