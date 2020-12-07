import shell from 'shelljs';

import {
  createJsClassComponentTemplate,
  createJsFunctionalComponentTemplate,
  createTsClassComponentTemplate,
  createTsFunctionalComponentTemplate,
} from '../utils';
import { FsUtil } from '../FsUtil';

interface GenerateComponentOptions {
  withStyles: 'css' | 'scss';
  typescript: boolean;
  usesModules: boolean;
  isClassBased: boolean;
}

export class Component {
  name: string = '';
  directory: string = '';
  withStyles: 'css' | 'scss' = 'css';
  usesTypescript: boolean = false;
  usesModules: boolean = false;
  isClassBased: boolean = false;

  generate = async (
    componentName: string,
    componentDir: string,
    { withStyles, typescript, isClassBased, usesModules }: GenerateComponentOptions,
  ) => {
    let message = `Generating ${componentName} component`;
    if (typescript) {
      message += ' with typescript';
    }

    if (withStyles && ['css', 'scss'].includes(withStyles)) {
      if (typescript) {
        message += ' and';
      }
      message += ` ${withStyles}`;
    }

    if (componentDir) {
      if (componentDir === '.') {
        console.info(`${message} in ${shell.pwd()}/`);
      } else {
        console.info(`${message} in ${shell.pwd()}/${componentDir}`);
      }
      return;
    }

    const fsUtil = new FsUtil();

    const hasSrcDir = await fsUtil.checkSrcDirectory();

    if (hasSrcDir) {
      const hasComponentsDir = await fsUtil.checkComponentsDirectory();

      if (!hasComponentsDir) {
        fsUtil.createComponentsDirectory();
      }
    } else {
      fsUtil.createSrcDirectory();
      fsUtil.createComponentsDirectory();
    }
    const componentDirPath = `${shell.pwd()}/src/components/${componentName}`;
    message += ` in "${componentDirPath}"`;

    console.info(`${message}...`);
    this.create();
  };

  create = () => {
    shell.cd('src');
    shell.cd('components');
    shell.mkdir(this.name);
    shell.cd(this.name);

    this.createStyles();

    let filename = this.createFile();

    shell.exec(`echo "${this.createTemplate()}" >> ${filename}`);
  };

  createStyles = () => {
    if (this.withStyles === 'css') {
      if (this.usesModules) {
        shell.touch(`${this.name}.module.css`);
      } else {
        shell.touch(`${this.name}.css`);
      }
    } else {
      if (this.usesModules) {
        shell.touch(`${this.name}.module.scss`);
      } else {
        shell.touch(`${this.name}.scss`);
      }
    }
  };

  createFile = () => {
    let filename;

    if (this.usesTypescript) {
      shell.touch(`${this.name}.tsx`);
      filename = `${this.name}.tsx`;
    } else {
      shell.touch(`${this.name}.js`);
      filename = `${this.name}.js`;
    }

    return filename;
  };

  createTemplate = () => {
    let template;
    if (this.isClassBased && this.usesTypescript) {
      template = createTsClassComponentTemplate(this.name);
    } else if (this.isClassBased && !this.usesTypescript) {
      template = createJsClassComponentTemplate(this.name);
    } else if (!this.isClassBased && this.usesTypescript) {
      template = createTsFunctionalComponentTemplate(this.name);
    } else {
      template = createJsFunctionalComponentTemplate(this.name);
    }

    return template;
  };
}
