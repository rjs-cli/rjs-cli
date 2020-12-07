"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTsFunctionalComponentTemplate = exports.createTsClassComponentTemplate = exports.createJsFunctionalComponentTemplate = exports.createJsClassComponentTemplate = void 0;
var importStyle = function (componentName, withStyles, usesModules) {
    if (usesModules === void 0) { usesModules = false; }
    var styleImport;
    if (withStyles) {
        if (usesModules) {
            styleImport = "import styles from './" + componentName + ".module." + withStyles + "'";
        }
        else {
            styleImport = "import './" + componentName + "." + withStyles + "'";
        }
    }
    return styleImport;
};
exports.createJsClassComponentTemplate = function (componentName, withStyles, usesModules) {
    if (usesModules === void 0) { usesModules = false; }
    return "import React, { Component } from 'react';\n" + importStyle(componentName, withStyles, usesModules) + "\n\nclass " + componentName + " extends Component {\n  state = {};\n\n  render() {\n    return (\n      <div className='" + componentName + "'>\n      " + componentName + " component\n      </div>\n    );\n  }\n}\n\nexport default " + componentName + ";";
};
exports.createJsFunctionalComponentTemplate = function (componentName, withStyles, usesModules) {
    if (usesModules === void 0) { usesModules = false; }
    return "import React from 'react';\nimport PropTypes from 'prop-types';\n\n" + importStyle(componentName, withStyles, usesModules) + "\n\nconst " + componentName + " = () => {\n  return (\n    <div className='" + componentName + "'>\n    " + componentName + " component\n    </div>\n    );\n  };\n\n" + componentName + ".propTypes = {};\n\nexport default " + componentName + ";";
};
exports.createTsClassComponentTemplate = function (componentName, withStyles, usesModules) {
    if (usesModules === void 0) { usesModules = false; }
    return "";
};
exports.createTsFunctionalComponentTemplate = function (componentName, withStyles, usesModules) {
    if (usesModules === void 0) { usesModules = false; }
    return "";
};
