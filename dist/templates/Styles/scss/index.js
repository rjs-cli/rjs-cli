"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIndexScssTemplate = exports.createScssVariablesTemplate = void 0;
var variables_1 = require("./variables");
Object.defineProperty(exports, "createScssVariablesTemplate", { enumerable: true, get: function () { return variables_1.createScssVariablesTemplate; } });
exports.createIndexScssTemplate = function () { return "@import './reset';\n@import './variables';"; };
