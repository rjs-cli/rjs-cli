import { className, ComponentTemplateParams, importComponentStyle } from '../Component';

export const createAppTemplate = ({
  componentName,
  useTypescript = false,
  styleExtension = null,
  useModules = false,
}: ComponentTemplateParams) => {
  return `import React${useTypescript ? `, { FC }` : ''} from 'react';
${useTypescript ? '' : `import PropTypes from 'prop-types';`}

${importComponentStyle(componentName, styleExtension, useModules)}
import logo from '../logo.svg';
${
  useTypescript
    ? `interface ${componentName}Props {

}`
    : ''
}

const ${componentName}${useTypescript ? `: FC<${componentName}Props>` : ''} = () => {
  return (
      <div ${className(componentName, useModules, styleExtension)}>
        <h1>Hello from App !</h1>
        This was generated by
        <a
        href='https://npmjs/reactjs-cli'
        target='_blank'
        rel='noopener noreferrer'
        >rjs</a> thanks to
        <a
        href='https://github.com/facebook/create-react-app'
        target='_blank'
        rel='noopener noreferrer'
        >create-react-app</a>.
        Start modifying <code>src/App/App.${
          useTypescript ? 'tsx' : 'js'
        }</code> to start an amazing project ! 😁
        <div>
          To learn react
          <a
          href='https://fr.reactjs.org/'
          target='_blank'
          rel='noopener noreferrer'
          >click here</a>.
        </div>
      </div>
    );
  };

${useTypescript ? '' : `${componentName}.propTypes = {};`}

export default ${componentName};`;
};

export const createAppTestTemplate = () => `import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
`;

export const createAppContainerTemplate = (useTypescript: boolean) => {
  const tsImports = useTypescript
    ? `import { Dispatch } from 'react';
  import { State } from '../../store/reducers';

  interface StateToProps {}

  interface ownProps {}

  interface DispatchToProps {}`
    : '';

  const mapDispatchToProps = useTypescript
    ? `const mapDispatchToProps = (dispatch: Dispatch<actions>): DispatchToProps => ({});`
    : `const mapDispatchToProps = (dispatch) => ({});`;

  const mapStateToProps = useTypescript
    ? `const mapStateToProps = (state: State, ownProps: ownProps): StateToProps => ({});`
    : 'const mapStateToProps = (state, ownProps) => ({});';

  const typeDef = useTypescript
    ? 'export type CountryDetailsPropsFromRedux = StateToProps & DispatchToProps & ownProps;'
    : '';

  return `import { connect } from 'react-redux';
${tsImports}

import * as actions from '../../store/actions';
import App from '../../App/App';

${mapStateToProps}

${mapDispatchToProps}

${typeDef}

export default connect(mapStateToProps, mapDispatchToProps)(App);`;
};
