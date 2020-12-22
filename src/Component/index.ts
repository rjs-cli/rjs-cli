import path from 'path';
import os from 'os';
import shell from 'shelljs';
import { createClassComponentTemplate, createFunctionalComponentTemplate } from '../templates';
import { fsUtil } from '../FsUtil';
import { Terminal } from '../Terminal';

interface GenerateComponentOptions {
  withStyles: 'css' | 'scss';
  useTypescript: boolean;
  useModules: boolean;
  class: boolean;
}

export class Component {
  name: string = '';
  directory: string = '';
  withStyles: 'css' | 'scss' | null = null;
  useTypescript: boolean = false;
  useModules: boolean = false;
  isClassBased: boolean = false;
  message: string = '';

  generate = async (
    componentName: string,
    componentDir: string,
    { withStyles, useTypescript, class: isClassBased, useModules }: GenerateComponentOptions,
  ) => {
    this.name = componentName;
    this.directory = componentDir;
    this.useTypescript = useTypescript;
    this.isClassBased = isClassBased;
    this.useModules = useModules;

    if (['css', 'scss'].includes(withStyles)) {
      this.withStyles = withStyles;
    }

    const scriptType = this.useTypescript ? 'typescript' : 'javascript';
    const styleExtension = this.withStyles && ['css', 'scss'].includes(this.withStyles);
    const modules = this.useModules ? 'modules' : '';
    const componentType = this.isClassBased ? 'class' : 'functionnal';

    this.message = `Generating ${scriptType} ${componentType} component ${this.name}${
      styleExtension ? ` with ${this.withStyles} ${modules}` : ''
    }`;

    try {
      if (this.directory) {
        let dirPath;

        if (this.directory === '.') {
          this.message += ` in ${process.cwd()}`;
          dirPath = `${process.cwd()}`;
          const separatorRegexp = new RegExp(/[\/ | \\]/, 'g');
          const splitPath = dirPath.split(separatorRegexp);

          if (splitPath[splitPath.length - 1] === 'src') {
            Terminal.errorMessage(
              `Cannot create component files in src directory. You must be inside a directory.
              ${os.EOL}Please navigate inside one or specify a directory name. ${os.EOL}    example: rjs gc <name> [directory] [options]
              `,
            );
            process.exit(1);
          }
        } else {
          this.message += ` in ${process.cwd()}/${this.directory}`;
          dirPath = path.join(process.cwd(), this.directory);
        }

        if (!dirPath.includes('src')) {
          Terminal.errorMessage(
            "You're not in the src directory of your app, cannot create components outside of src.",
          );
          process.exit(1);
        }

        await this.create(dirPath);

        process.exit(0);
      }
    } catch (e) {}

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

    this.directory = path.join(shell.pwd().stdout, 'src', 'components', this.name);
    this.message += ` in "${this.directory}"`;

    Terminal.navigateTo(['src', 'components']);

    await this.create();
  };

  checkExistence = async (dirPath?: string) => {
    const alreadyExists = await fsUtil.doesDirectoryExist(this.name, dirPath);

    if (alreadyExists) {
      Terminal.errorMessage(`This component already exists, please choose a different name.`);

      process.exit(1);
    }
  };

  create = async (dirPath?: string) => {
    await this.checkExistence(dirPath);

    Terminal.successMessage(`${this.message}...`);

    if (!dirPath) {
      await fsUtil.createDirIfNotExists(this.name);
      Terminal.navigateTo([this.name]);
    } else if (dirPath !== '.') {
      await fsUtil.createDirIfNotExists(this.name, this.directory);
      Terminal.navigateTo([dirPath]);
    }

    if (this.withStyles) {
      await this.createStyles();
    }

    const filename = this.useTypescript ? `${this.name}.tsx` : `${this.name}.js`;

    await fsUtil.writeFile(filename, this.createTemplate());
  };

  createStyles = async () => {
    const extension = this.withStyles;
    let file;

    this.useModules
      ? (file = `${this.name}.module.${extension}`)
      : (file = `${this.name}.${extension}`);

    await fsUtil.writeFile(file, `.${this.name} {}`);
  };

  createTemplate = () => {
    const {
      name: componentName,
      withStyles: styleExtension,
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
