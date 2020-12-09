"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTsFunctionalComponentTemplate = exports.createTsClassComponentTemplate = exports.createJsFunctionalComponentTemplate = exports.createJsClassComponentTemplate = void 0;
var importStyle = function (componentName, useStyles, useModules) {
    if (useModules === void 0) { useModules = false; }
    var styleImport;
    if (useStyles) {
        if (useModules) {
            styleImport = "import styles from './" + componentName + ".module." + useStyles + "'";
        }
        else {
            styleImport = "import './" + componentName + "." + useStyles + "'";
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
exports.createJsClassComponentTemplate = function (componentName, useStyles, useModules) {
    if (useModules === void 0) { useModules = false; }
    return "import React, { Component } from 'react';\n" + importStyle(componentName, useStyles, useModules) + "\n\nclass " + componentName + " extends Component {\n  state = {};\n\n  render() {\n    return (\n      <div className=" + className(componentName, useModules) + ">\n      " + componentName + " Component\n      </div>\n    );\n  }\n}\n\nexport default " + componentName + ";";
};
exports.createJsFunctionalComponentTemplate = function (componentName, useStyles, useModules) {
    if (useModules === void 0) { useModules = false; }
    console.log(className(componentName, useModules));
    return "import React from 'react';\nimport PropTypes from 'prop-types';\n\n" + importStyle(componentName, useStyles, useModules) + "\n\nconst " + componentName + " = () => {\n  return (\n    <div className=" + className(componentName, useModules) + ">\n    " + componentName + " Component\n    </div>\n    );\n  };\n\n" + componentName + ".propTypes = {};\n\nexport default " + componentName + ";";
};
exports.createTsClassComponentTemplate = function (componentName, useStyles, useModules) {
    if (useModules === void 0) { useModules = false; }
    return "import React, { Component } from 'react';\n" + importStyle(componentName, useStyles, useModules) + "\n\ninterface " + componentName + "Props {}\n\ninterface " + componentName + "State {}\n\nclass " + componentName + " extends Component<" + componentName + "Props, " + componentName + "State> {\n  state = {}\n\n  render() {\n    return (\n      <div className=" + className(componentName, useModules) + ">\n        " + componentName + " Component\n      </div>\n    );\n  }\n}\n\nexport default index;";
};
exports.createTsFunctionalComponentTemplate = function (componentName, useStyles, useModules) {
    if (useModules === void 0) { useModules = false; }
    return "import React, { FC } from 'react';\n" + importStyle(componentName, useStyles, useModules) + "\n\ninterface " + componentName + "Props {\n\n}\n\nconst " + componentName + ": FC<indexProps> = () => {\n  return <div className=" + className(componentName, useModules) + ">" + componentName + " Component</div>\n};\n\nexport default " + componentName + ";";
};
