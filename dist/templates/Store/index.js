"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createActionTemplate = exports.createRootReducerTemplate = exports.createReducerTemplate = exports.createMiddlewareTemplate = exports.createStoreTemplate = void 0;
exports.createStoreTemplate = function () { return "import { createStore, applyMiddleware } from 'redux';\nimport { composeWithDevTools } from 'redux-devtools-extension';\n\nimport rootReducer from './reducers';\nimport { templateMiddleware } from './middlewares';\n\nconst composeEnhancers = composeWithDevTools({ trace: true });\nconst enhancers = composeEnhancers(applyMiddleware(templateMiddleware /* your other middlewares... */));\n\nconst store = createStore(rootReducer, enhancers);\n\nexport default store;"; };
exports.createMiddlewareTemplate = function (useTypescript, useAxios) {
    var _a, _b, _c;
    var typeAnnot = useTypescript
        ? [': MiddlewareAPI', ': Dispatch<AnyAction>', ': actionsTemplate.ActionTemplateActions']
        : [];
    return "import { actionsTemplate } from '../actions';\n" + (useTypescript ? "import { MiddlewareAPI, Dispatch, AnyAction } from 'redux';" : '') + "\n" + (useAxios ? "import axios from 'axios';" : '') + "\n\nexport const templateMiddleware = (store" + ((_a = typeAnnot[0]) !== null && _a !== void 0 ? _a : '') + ") => (next" + ((_b = typeAnnot[1]) !== null && _b !== void 0 ? _b : '') + ") => async (action" + ((_c = typeAnnot[2]) !== null && _c !== void 0 ? _c : '') + ") => {\n  switch (action.type) {\n    case actionsTemplate.RANDOM_EXAMPLE:\n      // ...\n      break\n    default:\n      next(action);\n  }\n};";
};
exports.createReducerTemplate = function (useTypescript) {
    var _a, _b, _c, _d;
    var typeAnnot = useTypescript
        ? [': templateReducerState', ': actionsTemplate.ActionTemplateActions']
        : [];
    return "import { actionsTemplate } from '../actions';\n\n" + (useTypescript ? "export interface templateReducerState {}" : '') + "\nconst INITIAL_STATE" + ((_a = typeAnnot[0]) !== null && _a !== void 0 ? _a : '') + " = {};\n\nconst reducer = (state" + ((_b = typeAnnot[0]) !== null && _b !== void 0 ? _b : '') + " = INITIAL_STATE, action" + ((_c = typeAnnot[1]) !== null && _c !== void 0 ? _c : '') + ") " + ((_d = typeAnnot[0]) !== null && _d !== void 0 ? _d : '') + " => {\n  switch (action.type) {\n    case actionsTemplate.RANDOM_EXAMPLE:\n      return {\n        ...state,\n      };\n    default:\n      return state;\n  }\n};\n\nexport default reducer;";
};
exports.createRootReducerTemplate = function (useTypescript) { return "import { combineReducers } from 'redux';\n/* import your reducers here */\nimport template" + (useTypescript ? ", { templateReducerState }" : '') + " from './reducer.template';\n" + (useTypescript
    ? "export interface State {\n  template: templateReducerState;\n};"
    : '') + "\n\nconst reducer = combineReducers({ template });\n\nexport default reducer;"; };
exports.createActionTemplate = function (useTypescript) {
    return "export const RANDOM_EXAMPLE = 'RANDOM_EXAMPLE';\n\n" + (useTypescript
        ? "interface RandomExampleAction {\n  type: typeof RANDOM_EXAMPLE;\n  payload: {};\n}"
        : '') + "\n\nexport const randomExample = (payload" + (useTypescript ? ": {}" : '') + ")" + (useTypescript ? ": RandomExampleAction" : '') + " => ({ type: RANDOM_EXAMPLE, payload });\n\n" + (useTypescript
        ? "export type ActionTemplateActions = RandomExampleAction; /* | SomeOtherAction | ... */"
        : '');
};
