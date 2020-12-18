import path from 'path';
import shell from 'shelljs';
import { createClassComponentTemplate, createFunctionalComponentTemplate } from '../templates';
import { fsUtil } from '../FsUtil';
import { terminal } from '../Terminal';

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
  message: string = '';

  generate = async (
    componentName: string,
    componentDir: string,
    { useStyles, useTypescript, isClassBased, useModules }: GenerateComponentOptions,
  ) => {
    this.name = componentName;
    this.directory = componentDir;
    if (['css', 'scss'].includes(useStyles)) {
      this.useStyles = useStyles;
    }

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
      await this.checkExistence();

      // todo create component
      if (this.directory === '.') {
        console.info(`${this.message} in ${shell.pwd()}/`);
      } else {
        console.info(`${this.message} in ${shell.pwd()}/${this.directory}`);
      }

      process.exit(0);
    }

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

    this.directory = `${shell.pwd()}/src/components/${this.name}`;
    this.message += ` in "${this.directory}"`;

    shell.cd(path.join('src', 'components'));
    await this.create();
  };

  checkExistence = async () => {
    const alreadyExists = await fsUtil.doesDirectoryExist(this.name);

    if (alreadyExists) {
      console.error('This component already exists, please choose a different name.');
      process.exit(1);
    }
  };

  create = async () => {
    await this.checkExistence();

    console.info(`${this.message}...`);

    shell.mkdir(this.name);
    shell.cd(this.name);

    if (this.useStyles) {
      this.createStyles();
    }

    const filename = this.useTypescript ? `${this.name}.tsx` : `${this.name}.js`;

    fsUtil.writeFile(filename, this.createTemplate());
  };

  createStyles = () => {
    const extension = this.useStyles;
    let file;

    this.useModules
      ? (file = `${this.name}.module.${extension}`)
      : (file = `${this.name}.${extension}`);

    shell.touch(file);
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
