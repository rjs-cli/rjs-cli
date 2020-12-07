export const jsComponentTemplate = (componentName: string) => `import React from 'react';

const ${componentName} = () => {
  return (
    <div className={${componentName}}>
      ${componentName} component
    </div>
  );
};

export default ${componentName};`;
