"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIndexStyleTemplate = void 0;
exports.createIndexStyleTemplate = function (_a) {
    var useSass = _a.useSass;
    return useSass
        ? "@import './reset';\n@import './variables';"
        : '';
};
