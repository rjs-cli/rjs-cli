export const createStoreTemplate = () => `import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';
import { templateMiddleware } from './middlewares';

const composeEnhancers = composeWithDevTools({ trace: true });
const enhancers = composeEnhancers(applyMiddleware(templateMiddleware /* your other middlewares... */));

const store = createStore(rootReducer, enhancers);

export default store;`;

export const createMiddlewareTemplate = (useTypescript: boolean, useAxios: boolean) => {
  const typeAnnot = useTypescript
    ? [': MiddlewareAPI', ': Dispatch<AnyAction>', ': actionsTemplate.ActionTemplateActions']
    : [];

  return `import { actionsTemplate } from '../actions';
${useTypescript ? "import { MiddlewareAPI, Dispatch, AnyAction } from 'redux';" : ''}
${useAxios ? "import axios from 'axios';" : ''}

export const templateMiddleware = (store${typeAnnot[0] ?? ''}) => (next${typeAnnot[1] ?? ''}) => async (action${
    typeAnnot[2] ?? ''
  }) => {
  switch (action.type) {
    case actionsTemplate.RANDOM_EXAMPLE:
      // ...
      break
    default:
      next(action);
  }
};`;
};

export const createReducerTemplate = (useTypescript: boolean) => {
  const typeAnnot = useTypescript
    ? [': templateReducerState', ': actionsTemplate.ActionTemplateActions']
    : [];
  return `import { actionsTemplate } from '../actions';

${useTypescript ? `export interface templateReducerState {}` : ''}
const INITIAL_STATE${typeAnnot[0] ?? ''} = {};

const reducer = (state${typeAnnot[0] ?? ''} = INITIAL_STATE, action${typeAnnot[1] ?? ''}) ${
    typeAnnot[0] ?? ''
  } => {
  switch (action.type) {
    case actionsTemplate.RANDOM_EXAMPLE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;`;
};

export const createRootReducerTemplate = (
  useTypescript: boolean,
) => `import { combineReducers } from 'redux';
/* import your reducers here */
import template${useTypescript ? `, { templateReducerState }` : ''} from './reducer.template';
${
  useTypescript
    ? `export interface State {
  template: templateReducerState;
};`
    : ''
}

const reducer = combineReducers({ template });

export default reducer;`;

export const createActionTemplate = (useTypescript: boolean) => {
  return `export const RANDOM_EXAMPLE = 'RANDOM_EXAMPLE';

${
  useTypescript
    ? `interface RandomExampleAction {
  type: typeof RANDOM_EXAMPLE;
  payload: {};
}`
    : ''
}

export const randomExample = (payload${useTypescript ? `: {}` : ''})${
    useTypescript ? `: RandomExampleAction` : ''
  } => ({ type: RANDOM_EXAMPLE, payload });

${
  useTypescript
    ? `export type ActionTemplateActions = RandomExampleAction; /* | SomeOtherAction | ... */`
    : ''
}`;
};
