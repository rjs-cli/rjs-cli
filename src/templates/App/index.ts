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
        href="https://npmjs/reactjs-cli"
        target="_blank"
        rel="noopener noreferrer"
        >rjs</a> thanks to
        <a
        href="https://github.com/facebook/create-react-app"
        target="_blank"
        rel="noopener noreferrer"
        >create-react-app</a>.
        Start modifying this file to start an amazing project ! 😁
        <div>
          To learn more about react :
          <a
          href="https://fr.reactjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          >click here</a>.
        </div>
      </div>
    );
  };

${useTypescript ? '' : `${componentName}.propTypes = {};`}

export default ${componentName};`;
};
