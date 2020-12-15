"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIndexScriptTemplate = void 0;
exports.createIndexScriptTemplate = function (_a) {
    var useRedux = _a.useRedux, useSass = _a.useSass, useRouter = _a.useRouter;
    var extension = useSass ? 'scss' : 'css';
    return "import React from 'react';\nimport ReactDOM from 'react-dom';\n" + (useRouter ? "import { BrowserRouter as Router } from 'react-router-dom';" : '') + "\n" + (useRedux
        ? "import { Provider } from 'react-redux';\nimport store from './store';"
        : '') + "\nimport App from '." + (useRedux ? '/containers' : '') + "/App/App';\n\n\n" + (!useSass ? "import './assets/css/reset.css';" : '') + "\nimport './assets/" + extension + "/index." + extension + "';\n\nReactDOM.render(\n  " + (useRedux ? "<Provider store={store}>" : '') + "\n    " + (useRouter ? "<Router>" : '') + "\n      <React.StrictMode>\n        <App />\n      </React.StrictMode>\n    " + (useRouter ? "</Router>" : '') + "\n  " + (useRedux ? "</Provider>" : '') + ",\n  document.getElementById('root'),\n);";
};
