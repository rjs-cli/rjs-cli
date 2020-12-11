"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFunctionalComponentTemplate = void 0;
var _1 = require(".");
exports.createFunctionalComponentTemplate = function (_a) {
    var componentName = _a.componentName, _b = _a.useTypescript, useTypescript = _b === void 0 ? false : _b, _c = _a.styleExtension, styleExtension = _c === void 0 ? null : _c, _d = _a.useModules, useModules = _d === void 0 ? false : _d;
    return "import React" + (useTypescript ? ", { FC }" : '') + " from 'react';\n" + (useTypescript ? '' : "import PropTypes from 'prop-types';") + "\n\n" + _1.importComponentStyle(componentName, styleExtension, useModules) + "\n" + (useTypescript
        ? "interface " + componentName + "Props {\n\n}"
        : '') + "\n\nconst " + componentName + (useTypescript ? ": FC<" + componentName + "Props>" : '') + " = () => {\n  return (\n    <div " + _1.className(componentName, useModules, styleExtension) + ">\n    " + componentName + " Component\n    </div>\n    );\n  };\n\n" + (useTypescript ? '' : componentName + ".propTypes = {};") + "\n\nexport default " + componentName + ";";
};
