"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClassComponentTemplate = void 0;
var _1 = require(".");
exports.createClassComponentTemplate = function (_a) {
    var componentName = _a.componentName, _b = _a.useTypescript, useTypescript = _b === void 0 ? false : _b, _c = _a.styleExtension, styleExtension = _c === void 0 ? null : _c, _d = _a.useModules, useModules = _d === void 0 ? false : _d;
    return "import React, { Component } from 'react';\n" + _1.importComponentStyle(componentName, styleExtension, useModules) + "\n\n" + (useTypescript
        ? "interface " + componentName + "Props {}\ninterface " + componentName + "State {}"
        : '') + "\n\nclass " + componentName + " extends Component" + (useTypescript ? "<" + componentName + "Props, " + componentName + "State>" : '') + " {\n  state = {};\n\n  render() {\n    return (\n      <div className=" + _1.className(componentName, useModules, styleExtension) + ">\n      " + componentName + " Component\n      </div>\n    );\n  }\n}\n\nexport default " + componentName + ";";
};
