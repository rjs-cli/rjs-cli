"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsComponentTemplate = void 0;
exports.jsComponentTemplate = function (componentName) { return "import React from 'react';\n\nconst " + componentName + " = () => {\n  return (\n    <div className={" + componentName + "}>\n      " + componentName + " component\n    </div>\n  );\n};\n\nexport default " + componentName + ";"; };
