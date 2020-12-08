import shell from 'shelljs';
import {
  createJsClassComponentTemplate,
  createJsFunctionalComponentTemplate,
  createTsClassComponentTemplate,
  createTsFunctionalComponentTemplate,
} from '../utils';
import { FsUtil } from '../FsUtil';

interface GenerateComponentOptions {
  withStyles?: 'css' | 'scss';
  typescript: boolean;
  usesModules: boolean;
  isClassBased: boolean;
}

export class Component {
  name: string = '';
  directory: string = '';
  withStyles?: 'css' | 'scss' = 'css';
  usesTypescript: boolean = false;
  usesModules: boolean = false;
  isClassBased: boolean = false;
  fsUtil;
  message: string = '';

  constructor() {
    this.fsUtil = new FsUtil();
  }

  generate = async (
    componentName: string,
    componentDir: string,
    { withStyles, typescript, isClassBased, usesModules }: GenerateComponentOptions,
  ) => {
    this.name = componentName;
    this.directory = componentDir;
    this.withStyles = withStyles;
    this.usesTypescript = typescript;
    this.isClassBased = isClassBased;
    this.usesModules = usesModules;

    this.message = `Generating ${this.name} component`;
    if (typescript) {
      this.message += ' with typescript';
    }

    if (this.withStyles && ['css', 'scss'].includes(this.withStyles)) {
      if (typescript) {
        this.message += ' and';
      }
      this.message += ` ${this.withStyles}`;
    }

    if (this.directory) {
      await this.checkExistance()

      // todo create component
      if (this.directory === '.') {
        console.info(`${this.message} in ${shell.pwd()}/`);
      } else {
        console.info(`${this.message} in ${shell.pwd()}/${this.directory}`);
      }

      process.exit(0);
    }

    const hasSrcDir = await this.fsUtil.checkSrcDirectory();

    if (hasSrcDir) {
      const hasComponentsDir = await this.fsUtil.checkComponentsDirectory();

      if (!hasComponentsDir) {
        this.fsUtil.createComponentsDirectory();
      }
    } else {
      this.fsUtil.createSrcDirectory();
      this.fsUtil.createComponentsDirectory();
    }

    this.directory = `${shell.pwd()}/src/components/${this.name}`;
    this.message += ` in "${this.directory}"`;

    shell.cd('src/components');
    await this.create();
  };

  checkExistance = async () => {
    const alreadyExists = await this.fsUtil.alreadyExists(this.name);

    if (alreadyExists) {
      console.error('This component already exists, please choose a different name.');
      process.exit(1);
    }
  }

  create = async () => {
    await this.checkExistance();

    console.info(`${this.message}...`);

    shell.mkdir(this.name);
    shell.cd(this.name);

    if (this.withStyles) {
      this.createStyles();
    }

    let filename = this.createFile();

    shell.exec(`echo "${this.createTemplate()}" > ${filename}`);
  };

  createStyles = () => {
    const extension = this.withStyles;
    let file;

    this.usesModules
      ? file = `${this.name}.module.${extension}`
      : file = `${this.name}.${extension}`

    shell.touch(file);
  };

  createFile = () => {
    let filename;

    this.usesTypescript
      ? filename = `${this.name}.tsx`
      : filename = `${this.name}.js`;

    shell.touch(filename);

    return filename;
  };

  createTemplate = () => {
    let template;
    if (this.isClassBased && this.usesTypescript) {
      template = createTsClassComponentTemplate(this.name, this.withStyles,this.usesModules);
    } else if (this.isClassBased && !this.usesTypescript) {
      template = createJsClassComponentTemplate(this.name, this.withStyles,this.usesModules);
    } else if (!this.isClassBased && this.usesTypescript) {
      template = createTsFunctionalComponentTemplate(this.name, this.withStyles,this.usesModules);
    } else {
      template = createJsFunctionalComponentTemplate(this.name, this.withStyles,this.usesModules);
    }

    return template;
  };
}
