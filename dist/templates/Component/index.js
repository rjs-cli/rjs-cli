"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClassComponentTemplate = exports.createFunctionalComponentTemplate = exports.className = exports.importComponentStyle = void 0;
exports.importComponentStyle = function (componentName, styleExtension, useModules) {
    if (useModules === void 0) { useModules = false; }
    var styleImport;
    if (styleExtension) {
        if (useModules) {
            styleImport = "import styles from './" + componentName + ".module." + styleExtension + "'";
        }
        else {
            styleImport = "import './" + componentName + "." + styleExtension + "'";
        }
        return styleImport;
    }
    return "\" \"";
};
exports.className = function (componentName, useModules, useStyles) {
    if (useStyles === void 0) { useStyles = null; }
    var className = 'className=';
    if (useModules) {
        className += "{styles." + componentName + "}";
    }
    else {
        className += "'" + componentName + "'";
    }
    if (!useStyles)
        return '';
    return className;
};
var functional_1 = require("./functional");
Object.defineProperty(exports, "createFunctionalComponentTemplate", { enumerable: true, get: function () { return functional_1.createFunctionalComponentTemplate; } });
var class_1 = require("./class");
Object.defineProperty(exports, "createClassComponentTemplate", { enumerable: true, get: function () { return class_1.createClassComponentTemplate; } });
