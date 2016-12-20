"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var sortable_directive_1 = require('./src/sortable.directive');
__export(require('./src/sortable.directive'));
var SortablejsModule = (function () {
    function SortablejsModule() {
    }
    SortablejsModule.forRoot = function (globalOptions) {
        SortablejsModule._globalOptions = globalOptions;
        return SortablejsModule;
    };
    SortablejsModule._globalOptions = {};
    SortablejsModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [sortable_directive_1.SortablejsDirective],
                    imports: [common_1.CommonModule],
                    exports: [sortable_directive_1.SortablejsDirective]
                },] },
    ];
    /** @nocollapse */
    SortablejsModule.ctorParameters = function () { return []; };
    return SortablejsModule;
}());
exports.SortablejsModule = SortablejsModule;
//# sourceMappingURL=index.js.map