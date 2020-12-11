export interface ComponentTemplateParams {
  componentName: string;
  useTypescript: boolean;
  styleExtension: 'css' | 'scss' | null;
  useModules: boolean;
}

export const importComponentStyle = (
  componentName: string,
  styleExtension: 'css' | 'scss' | null,
  useModules: boolean = false,
) => {
  let styleImport;
  if (styleExtension) {
    if (useModules) {
      styleImport = `import styles from './${componentName}.module.${styleExtension}'`;
    } else {
      styleImport = `import './${componentName}.${styleExtension}'`;
    }
    return styleImport;
  }

  return `" "`;
};

export const className = (
  componentName: string,
  useModules: boolean,
  useStyles: 'css' | 'scss' | null = null,
) => {
  let className: string = 'className=';

  if (useModules) {
    className += `{styles.${componentName}}`;
  } else {
    className += `'${componentName}'`;
  }
  if (!useStyles) return '';

  return className;
};

export { createFunctionalComponentTemplate } from './functional';
export { createClassComponentTemplate } from './class';
