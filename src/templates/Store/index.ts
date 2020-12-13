export const createStoreTemplate = () => `import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';
//import {  } from './middlewares';

const composeEnhancers = composeWithDevTools({ trace: true });
const enhancers = composeEnhancers(applyMiddleware(/* your middlewares go here */));

const store = createStore(rootReducer, enhancers);

export default store;`;
