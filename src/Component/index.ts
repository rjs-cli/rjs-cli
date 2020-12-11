import shell from 'shelljs';
import { createClassComponentTemplate, createFunctionalComponentTemplate } from '../templates';
import { FsUtil } from '../FsUtil';

interface GenerateComponentOptions {
  useStyles: 'css' | 'scss';
  useTypescript: boolean;
  useModules: boolean;
  isClassBased: boolean;
}

export class Component {
  name: string = '';
  directory: string = '';
  useStyles: 'css' | 'scss' | null = null;
  useTypescript: boolean = false;
  useModules: boolean = false;
  isClassBased: boolean = false;
  fsUtil;
  message: string = '';

  constructor() {
    this.fsUtil = new FsUtil();
  }

  generate = async (
    componentName: string,
    componentDir: string,
    { useStyles, useTypescript, isClassBased, useModules }: GenerateComponentOptions,
  ) => {
    this.name = componentName;
    this.directory = componentDir;
    this.useStyles = ['css', 'scss'].includes(useStyles) ? useStyles : 'css';
    this.useTypescript = useTypescript;
    this.isClassBased = isClassBased;
    this.useModules = useModules;

    this.message = `Generating ${this.name} component`;
    if (this.useTypescript) {
      this.message += ' with typescript';
    }

    if (this.useStyles && ['css', 'scss'].includes(this.useStyles)) {
      if (this.useTypescript) {
        this.message += ' and';
      }
      this.message += ` ${this.useStyles}`;
    }

    if (this.directory) {
      await this.checkExistance();

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
  };

  create = async () => {
    await this.checkExistance();

    console.info(`${this.message}...`);

    shell.mkdir(this.name);
    shell.cd(this.name);

    if (this.useStyles) {
      this.createStyles();
    }

    let filename = this.createFile();

    shell.exec(`echo "${this.createTemplate()}" > ${filename}`);
  };

  createStyles = () => {
    const extension = this.useStyles;
    let file;

    this.useModules
      ? (file = `${this.name}.module.${extension}`)
      : (file = `${this.name}.${extension}`);

    shell.touch(file);
  };

  createFile = () => {
    let filename;

    this.useTypescript ? (filename = `${this.name}.tsx`) : (filename = `${this.name}.js`);

    shell.touch(filename);

    return filename;
  };

  createTemplate = () => {
    const {
      name: componentName,
      useStyles: styleExtension,
      useModules,
      useTypescript,
      isClassBased,
    } = this;

    let template;
    if (isClassBased) {
      template = createClassComponentTemplate({
        componentName,
        useModules,
        useTypescript,
        styleExtension,
      });
    } else {
      template = createFunctionalComponentTemplate({
        componentName,
        useModules,
        useTypescript,
        styleExtension,
      });
    }

    return template;
  };
}
