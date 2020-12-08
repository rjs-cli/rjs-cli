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
var className = function (componentName, usesModules) {
    var className = "'" + componentName + "'";
    if (usesModules)
        className = "{styles." + componentName + "}";
    return className;
};
exports.createJsClassComponentTemplate = function (componentName, withStyles, usesModules) {
    if (usesModules === void 0) { usesModules = false; }
    return "import React, { Component } from 'react';\n" + importStyle(componentName, withStyles, usesModules) + "\n\nclass " + componentName + " extends Component {\n  state = {};\n\n  render() {\n    return (\n      <div className=" + className(componentName, usesModules) + ">\n      " + componentName + " Component\n      </div>\n    );\n  }\n}\n\nexport default " + componentName + ";";
};
exports.createJsFunctionalComponentTemplate = function (componentName, withStyles, usesModules) {
    if (usesModules === void 0) { usesModules = false; }
    console.log(className(componentName, usesModules));
    return "import React from 'react';\nimport PropTypes from 'prop-types';\n\n" + importStyle(componentName, withStyles, usesModules) + "\n\nconst " + componentName + " = () => {\n  return (\n    <div className=" + className(componentName, usesModules) + ">\n    " + componentName + " Component\n    </div>\n    );\n  };\n\n" + componentName + ".propTypes = {};\n\nexport default " + componentName + ";";
};
exports.createTsClassComponentTemplate = function (componentName, withStyles, usesModules) {
    if (usesModules === void 0) { usesModules = false; }
    return "import React, { Component } from 'react';\n" + importStyle(componentName, withStyles, usesModules) + "\n\ninterface " + componentName + "Props {}\n\ninterface " + componentName + "State {}\n\nclass " + componentName + " extends Component<" + componentName + "Props, " + componentName + "State> {\n  state = {}\n  render() {\n    return (\n      <div className=" + className(componentName, usesModules) + ">\n        " + componentName + " Component\n      </div>\n    );\n  }\n}\n\nexport default index;";
};
exports.createTsFunctionalComponentTemplate = function (componentName, withStyles, usesModules) {
    if (usesModules === void 0) { usesModules = false; }
    return "import React, { FC } from 'react';\n" + importStyle(componentName, withStyles, usesModules) + "\n\ninterface " + componentName + "Props {\n\n}\n\nconst " + componentName + ": FC<indexProps> = () => {\n  return <div className=" + className(componentName, usesModules) + ">" + componentName + " Component</div>\n};\n\nexport default " + componentName + ";";
};
