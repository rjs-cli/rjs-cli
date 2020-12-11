import { ComponentTemplateParams, className, importComponentStyle } from '.';

export const createClassComponentTemplate = ({
  componentName,
  useTypescript = false,
  styleExtension = null,
  useModules = false,
}: ComponentTemplateParams) => {
  return `import React, { Component } from 'react';
${importComponentStyle(componentName, styleExtension, useModules)}

${
  useTypescript
    ? `interface ${componentName}Props {}
interface ${componentName}State {}`
    : ''
}

class ${componentName} extends Component${
    useTypescript ? `<${componentName}Props, ${componentName}State>` : ''
  } {
  state = {};

  render() {
    return (
      <div ${className(componentName, useModules, styleExtension)}>
      ${componentName} Component
      </div>
    );
  }
}

export default ${componentName};`;
};
