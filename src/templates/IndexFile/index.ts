interface IndexTemplateParams {
  useRedux: boolean;
  useSass: boolean;
  useRouter: boolean;
}
export const createIndexTemplate = ({ useRedux, useSass, useRouter }: IndexTemplateParams) => {
  const extension = useSass ? 'scss' : 'css';
  return `
import React from 'react';
import ReactDOM from 'react-dom';
${useRouter ? `import { BrowserRouter as Router } from 'react-router-dom';` : ''}
${
  useRedux
    ? `import { Provider } from 'react-redux';
import store from './store';`
    : ''
}
import App from './App/App';

import * as serviceWorker from './serviceWorker';
import './assets/${extension}/index.${extension}';

ReactDOM.render(
  ${useRedux ? `<Provider store={store}>` : ''}
    ${useRouter ? `<Router>` : ''}
      <React.StrictMode>
        <App />
      </React.StrictMode>
    ${useRouter ? `</Router>` : ''}
  ${useRedux ? `</Provider>` : ''},
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
`;
};
