"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTsClassComponentTemplate = exports.createFunctionalComponentTemplate = exports.createJsClassComponentTemplate = void 0;
var importComponentStyle = function (componentName, styleExtension, useModules) {
    if (useModules === void 0) { useModules = false; }
    var styleImport;
    if (styleExtension) {
        if (useModules) {
            styleImport = "import styles from './" + componentName + ".module." + styleExtension + "'";
        }
        else {
            styleImport = "import './" + componentName + "." + styleExtension + "'";
        }
    }
    return styleImport;
};
var className = function (componentName, useModules) {
    var className = "'" + componentName + "'";
    if (useModules)
        className = "{styles." + componentName + "}";
    return className;
};
exports.createJsClassComponentTemplate = function (componentName, styleExtension, useModules) {
    if (useModules === void 0) { useModules = false; }
    return "import React, { Component } from 'react';\n" + importComponentStyle(componentName, styleExtension, useModules) + "\n\nclass " + componentName + " extends Component {\n  state = {};\n\n  render() {\n    return (\n      <div className=" + className(componentName, useModules) + ">\n      " + componentName + " Component\n      </div>\n    );\n  }\n}\n\nexport default " + componentName + ";";
};
exports.createFunctionalComponentTemplate = function (_a) {
    var componentName = _a.componentName, useTypescript = _a.useTypescript, styleExtension = _a.styleExtension, useModules = _a.useModules;
    console.log(className(componentName, useModules));
    return "import React" + (useTypescript ? ", { FC }" : '') + " from 'react';\n" + (useTypescript ? '' : "import PropTypes from 'prop-types';") + "\n\n" + importComponentStyle(componentName, styleExtension, useModules) + "\n" + (useTypescript
        ? "interface " + componentName + "Props {\n\n}"
        : '') + "\n\nconst " + componentName + (useTypescript ? ": FC<" + componentName + "Props>" : '') + " = () => {\n  return (\n    <div className=" + className(componentName, useModules) + ">\n    " + componentName + " Component\n    </div>\n    );\n  };\n\n" + componentName + ".propTypes = {};\n\nexport default " + componentName + ";";
};
exports.createTsClassComponentTemplate = function (componentName, styleExtension, useModules) {
    if (useModules === void 0) { useModules = false; }
    return "import React, { Component } from 'react';\n" + importComponentStyle(componentName, styleExtension, useModules) + "\n\ninterface " + componentName + "Props {}\n\ninterface " + componentName + "State {}\n\nclass " + componentName + " extends Component<" + componentName + "Props, " + componentName + "State> {\n  state = {}\n\n  render() {\n    return (\n      <div className=" + className(componentName, useModules) + ">\n        " + componentName + " Component\n      </div>\n    );\n  }\n}\n\nexport default index;";
};
