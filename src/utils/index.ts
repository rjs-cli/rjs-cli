const importStyle = (
  componentName: string,
  useStyles?: 'css' | 'scss',
  useModules: boolean = false,
) => {
  let styleImport;
  if (useStyles) {
    if (useModules) {
      styleImport = `import styles from './${componentName}.module.${useStyles}'`;
    } else {
      styleImport = `import './${componentName}.${useStyles}'`;
    }
  }

  return styleImport;
};

const className = (componentName: string, useModules: boolean) => {
  let className: string = `'${componentName}'`;

  if (useModules)
    className = `{styles.${componentName}}`;

  return className;
};

export const createJsClassComponentTemplate = (
  componentName: string,
  useStyles?: 'css' | 'scss',
  useModules: boolean = false,
) => {
  return `import React, { Component } from 'react';
${importStyle(componentName, useStyles, useModules)}

class ${componentName} extends Component {
  state = {};

  render() {
    return (
      <div className=${className(componentName,useModules)}>
      ${componentName} Component
      </div>
    );
  }
}

export default ${componentName};`;
};

export const createJsFunctionalComponentTemplate = (
  componentName: string,
  useStyles?: 'css' | 'scss',
  useModules: boolean = false,
) => {
  console.log(className(componentName, useModules));

  return `import React from 'react';
import PropTypes from 'prop-types';

${importStyle(componentName, useStyles, useModules)}

const ${componentName} = () => {
  return (
    <div className=${className(componentName,useModules)}>
    ${componentName} Component
    </div>
    );
  };

${componentName}.propTypes = {};

export default ${componentName};`};

export const createTsClassComponentTemplate = (
  componentName: string,
  useStyles?: 'css' | 'scss',
  useModules: boolean = false,
) => `import React, { Component } from 'react';
${importStyle(componentName, useStyles, useModules)}

interface ${componentName}Props {}

interface ${componentName}State {}

class ${componentName} extends Component<${componentName}Props, ${componentName}State> {
  state = {}

  render() {
    return (
      <div className=${className(componentName, useModules)}>
        ${componentName} Component
      </div>
    );
  }
}

export default index;`;
export const createTsFunctionalComponentTemplate = (
  componentName: string,
  useStyles?: 'css' | 'scss',
  useModules: boolean = false,
) => `import React, { FC } from 'react';
${importStyle(componentName,useStyles,useModules)}

interface ${componentName}Props {

}

const ${componentName}: FC<indexProps> = () => {
  return <div className=${className(componentName,useModules)}>${componentName} Component</div>
};

export default ${componentName};`;
