"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsClassComponent = exports.jsClassComponent = exports.tsFunctionalComponent = exports.jsFunctionalComponentTemplate = void 0;
exports.jsFunctionalComponentTemplate = function (componentName) { return "import React from 'react';\n\nconst " + componentName + " = () => {\n  return (\n    <div className={" + componentName + "}>\n      " + componentName + " component\n    </div>\n  );\n};\n\nexport default " + componentName + ";"; };
exports.tsFunctionalComponent = function (componentName) { return ''; };
exports.jsClassComponent = function (componentName) { return ''; };
exports.tsClassComponent = function (componentName) { return ''; };
