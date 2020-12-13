"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStoreTemplate = void 0;
exports.createStoreTemplate = function () { return "import { createStore, applyMiddleware } from 'redux';\nimport { composeWithDevTools } from 'redux-devtools-extension';\n\nimport rootReducer from './reducers';\n//import {  } from './middlewares';\n\nconst composeEnhancers = composeWithDevTools({ trace: true });\nconst enhancers = composeEnhancers(applyMiddleware(/* your middlewares go here */));\n\nconst store = createStore(rootReducer, enhancers);\n\nexport default store;"; };
