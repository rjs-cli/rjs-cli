"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIndexTemplate = void 0;
exports.createIndexTemplate = function (_a) {
    var useRedux = _a.useRedux, useSass = _a.useSass, useRouter = _a.useRouter;
    var extension = useSass ? 'scss' : 'css';
    return "\nimport React from 'react';\nimport ReactDOM from 'react-dom';\n" + (useRouter ? "import { BrowserRouter as Router } from 'react-router-dom';" : '') + "\n" + (useRedux
        ? "import { Provider } from 'react-redux';\nimport store from './store';"
        : '') + "\nimport App from './App/App';\n\nimport * as serviceWorker from './serviceWorker';\nimport './assets/" + extension + "/index." + extension + "';\n\nReactDOM.render(\n  " + (useRedux ? "<Provider store={store}>" : '') + "\n    " + (useRouter ? "<Router>" : '') + "\n      <React.StrictMode>\n        <App />\n      </React.StrictMode>\n    " + (useRouter ? "</Router>" : '') + "\n  " + (useRedux ? "</Provider>" : '') + ",\n  document.getElementById('root'),\n);\n\n// If you want your app to work offline and load faster, you can change\n// unregister() to register() below. Note this comes with some pitfalls.\n// Learn more about service workers: https://bit.ly/CRA-PWA\nserviceWorker.unregister();\n";
};
