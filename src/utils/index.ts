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

const className = (componentName: string, usesModules: boolean) => {
  let className: string = `'${componentName}'`;

  if (usesModules)
    className = `{styles.${componentName}}`;

  return className;
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
      <div className=${className(componentName,usesModules)}>
      ${componentName} Component
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
) => {
  console.log(className(componentName, usesModules));

  return `import React from 'react';
import PropTypes from 'prop-types';

${importStyle(componentName, withStyles, usesModules)}

const ${componentName} = () => {
  return (
    <div className=${className(componentName,usesModules)}>
    ${componentName} Component
    </div>
    );
  };

${componentName}.propTypes = {};

export default ${componentName};`};

export const createTsClassComponentTemplate = (
  componentName: string,
  withStyles?: 'css' | 'scss',
  usesModules: boolean = false,
) => `import React, { Component } from 'react';
${importStyle(componentName, withStyles, usesModules)}

interface ${componentName}Props {}

interface ${componentName}State {}

class ${componentName} extends Component<${componentName}Props, ${componentName}State> {
  state = {}

  render() {
    return (
      <div className=${className(componentName, usesModules)}>
        ${componentName} Component
      </div>
    );
  }
}

export default index;`;
export const createTsFunctionalComponentTemplate = (
  componentName: string,
  withStyles?: 'css' | 'scss',
  usesModules: boolean = false,
) => `import React, { FC } from 'react';
${importStyle(componentName,withStyles,usesModules)}

interface ${componentName}Props {

}

const ${componentName}: FC<indexProps> = () => {
  return <div className=${className(componentName,usesModules)}>${componentName} Component</div>
};

export default ${componentName};`;
