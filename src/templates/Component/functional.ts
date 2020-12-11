import { ComponentTemplateParams, className, importComponentStyle } from '.';

export const createFunctionalComponentTemplate = ({
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
    ${componentName} Component
    </div>
    );
  };

${useTypescript ? '' : `${componentName}.propTypes = {};`}

export default ${componentName};`;
};
