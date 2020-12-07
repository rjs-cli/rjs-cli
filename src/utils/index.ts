export const jsFunctionalComponentTemplate = (componentName: string) => `import React from 'react';

const ${componentName} = () => {
  return (
    <div className={${componentName}}>
      ${componentName} component
    </div>
  );
};

export default ${componentName};`;

export const tsFunctionalComponent = (componentName: string) => '';

export const jsClassComponent = (componentName: string) => '';

export const tsClassComponent = (componentName: string) => '';
