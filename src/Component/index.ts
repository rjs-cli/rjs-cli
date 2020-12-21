import path from 'path';
import os from 'os';
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
    this.useTypescript = useTypescript;
    this.isClassBased = isClassBased;
    this.useModules = useModules;

    if (['css', 'scss'].includes(useStyles)) {
      this.useStyles = useStyles;
    }

    const scriptType = this.useTypescript ? 'typescript' : 'javascript';
    const styleExtension = this.useStyles && ['css', 'scss'].includes(this.useStyles);
    const modules = this.useModules ? 'modules' : '';
    const componentType = this.isClassBased ? 'class' : 'functionnal';

    this.message = `Generating ${scriptType} ${componentType} component ${this.name}${
      styleExtension ? ` with ${this.useStyles} ${modules}` : ''
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
            terminal.errorMessage(
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
          terminal.errorMessage(
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

    terminal.navigateTo(['src', 'components']);

    await this.create();
  };

  checkExistence = async (dirPath?: string) => {
    const alreadyExists = await fsUtil.doesDirectoryExist(this.name, dirPath);

    if (alreadyExists) {
      terminal.errorMessage(`This component already exists, please choose a different name.`);

      process.exit(1);
    }
  };

  create = async (dirPath?: string) => {
    await this.checkExistence(dirPath);

    terminal.successMessage(`${this.message}...`);

    if (!dirPath) {
      await fsUtil.createDirIfNotExists(this.name);
      terminal.navigateTo([this.name]);
    } else if (dirPath !== '.') {
      await fsUtil.createDirIfNotExists(this.name, this.directory);
      terminal.navigateTo([dirPath]);
    }

    if (this.useStyles) {
      await this.createStyles();
    }

    const filename = this.useTypescript ? `${this.name}.tsx` : `${this.name}.js`;

    await fsUtil.writeFile(filename, this.createTemplate());
  };

  createStyles = async () => {
    const extension = this.useStyles;
    let file;

    this.useModules
      ? (file = `${this.name}.module.${extension}`)
      : (file = `${this.name}.${extension}`);

    await fsUtil.writeFile(file, `.${this.name} {}`);
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
