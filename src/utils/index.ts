export const createJsClassComponentTemplate = (componentName: string) => '';
export const createJsFunctionalComponentTemplate = (
  componentName: string,
) => `import React from 'react';

const ${componentName} = () => {
  return (
    <div className={${componentName}}>
      ${componentName} component
    </div>
  );
};

export default ${componentName};`;

export const createTsClassComponentTemplate = (componentName: string) => '';
export const createTsFunctionalComponentTemplate = (componentName: string) => '';
