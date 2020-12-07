const importStyle = (
  componentName: string,
  withStyles?: 'css' | 'scss',
  usesModules: boolean = false,
) => {
  let styleImport;
  if (withStyles) {
    if (usesModules) {
      styleImport = `import styles from './${componentName}.module.${withStyles}'`;
    } else {
      styleImport = `import './${componentName}.${withStyles}'`;
    }
  }

  return styleImport;
};

export const createJsClassComponentTemplate = (
  componentName: string,
  withStyles?: 'css' | 'scss',
  usesModules: boolean = false,
) => {
  return `import React, { Component } from 'react';
${importStyle(componentName, withStyles, usesModules)}

class ${componentName} extends Component {
  state = {};

  render() {
    return (
      <div className='${componentName}'>
      ${componentName} component
      </div>
    );
  }
}

export default ${componentName};`;
};

export const createJsFunctionalComponentTemplate = (
  componentName: string,
  withStyles?: 'css' | 'scss',
  usesModules: boolean = false,
) => `import React from 'react';
import PropTypes from 'prop-types';

${importStyle(componentName, withStyles, usesModules)}

const ${componentName} = () => {
  return (
    <div className='${componentName}'>
    ${componentName} component
    </div>
    );
  };

${componentName}.propTypes = {};

export default ${componentName};`;

export const createTsClassComponentTemplate = (
  componentName: string,
  withStyles?: 'css' | 'scss',
  usesModules: boolean = false,
) => ``;
export const createTsFunctionalComponentTemplate = (
  componentName: string,
  withStyles?: 'css' | 'scss',
  usesModules: boolean = false,
) => ``;
