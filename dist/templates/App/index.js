"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppTestTemplate = exports.createAppTemplate = void 0;
var Component_1 = require("../Component");
exports.createAppTemplate = function (_a) {
    var componentName = _a.componentName, _b = _a.useTypescript, useTypescript = _b === void 0 ? false : _b, _c = _a.styleExtension, styleExtension = _c === void 0 ? null : _c, _d = _a.useModules, useModules = _d === void 0 ? false : _d;
    return "import React" + (useTypescript ? ", { FC }" : '') + " from 'react';\n" + (useTypescript ? '' : "import PropTypes from 'prop-types';") + "\n\n" + Component_1.importComponentStyle(componentName, styleExtension, useModules) + "\nimport logo from '../logo.svg';\n" + (useTypescript
        ? "interface " + componentName + "Props {\n\n}"
        : '') + "\n\nconst " + componentName + (useTypescript ? ": FC<" + componentName + "Props>" : '') + " = () => {\n  return (\n      <div " + Component_1.className(componentName, useModules, styleExtension) + ">\n        <h1>Hello from App !</h1>\n        This was generated by\n        <a\n        href='https://npmjs/reactjs-cli'\n        target='_blank'\n        rel='noopener noreferrer'\n        >rjs</a> thanks to\n        <a\n        href='https://github.com/facebook/create-react-app'\n        target='_blank'\n        rel='noopener noreferrer'\n        >create-react-app</a>.\n        Start modifying <code>src/App/App." + (useTypescript ? 'tsx' : 'js') + "</code> to start an amazing project ! \uD83D\uDE01\n        <div>\n          To learn react\n          <a\n          href='https://fr.reactjs.org/'\n          target='_blank'\n          rel='noopener noreferrer'\n          >click here</a>.\n        </div>\n      </div>\n    );\n  };\n\n" + (useTypescript ? '' : componentName + ".propTypes = {};") + "\n\nexport default " + componentName + ";";
};
exports.createAppTestTemplate = function () { return "import React from 'react';\nimport { render, screen } from '@testing-library/react';\nimport App from './App';\n\ntest('renders learn react link', () => {\n  render(<App />);\n  const linkElement = screen.getByText(/learn react/i);\n  expect(linkElement).toBeInTheDocument();\n});\n"; };
