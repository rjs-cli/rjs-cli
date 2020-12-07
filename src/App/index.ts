import { readdir } from 'fs/promises';
import shell from 'shelljs';
import { prompt } from 'enquirer';
import {
  jsFunctionalComponentTemplate,
  jsClassComponent,
  tsFunctionalComponent,
  tsClassComponent,
} from '../utils';

interface CreateReactAppOptions {
  typescript: boolean;
  interactive: boolean;
}

interface GenerateComponentOptions {
  withStyles: 'css' | 'scss' | 'css-module' | 'scss-module';
  typescript: boolean;
  class: boolean;
}

export class App {
  appName: string = '';
  usesTypescript: boolean = false;

  interactiveCreateReactApp = async (askName: boolean) => {
    if (askName) {
      const { appName }: { appName: string } = await prompt({
        type: 'input',
        name: 'appName',
        message: 'What is the name of the project ?',
      });

      this.appName = appName;
    }
    const { typescript }: { typescript: boolean } = await prompt({
      type: 'confirm',
      name: 'typescript',
      message: 'Would you like to use typescript in your project ?',
      required: true,
    });
    this.usesTypescript = typescript;
  };

  createReactApp = async (appName: string, { typescript, interactive }: CreateReactAppOptions) => {
    try {
      this.appName = appName;
      this.usesTypescript = typescript;

      if (interactive || !appName) {
        await this.interactiveCreateReactApp(!appName);
      }
      // const appDirectory = `${process.cwd()}/${dir}`;

      let command = `npx create-react-app ${appName}`;
      if (typescript) {
        command += ` --template typescript`;
      }
      console.log({ typescript: this.usesTypescript, appName: this.appName });

      // console.log(command);
      // shell.exec(command);
    } catch (e) {
      process.exit(1);
    }
  };

  generateComponent = async (
    componentName: string,
    componentDir: string,
    { withStyles, typescript, class: classBased }: GenerateComponentOptions,
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

    const hasSrcDir = await this.checkSrcDirectory();

    if (hasSrcDir) {
      const hasComponentsDir = await this.checkComponentsDirectory();

      if (!hasComponentsDir) {
        this.createComponentsDirectory();
      }
    } else {
      this.createSrcDirectory();
      this.createComponentsDirectory();
    }
    const componentDirPath = `${shell.pwd()}/src/components/${componentName}`;
    message += ` in "${componentDirPath}"`;

    console.info(`${message}...`);
    this.createComponent(componentName);
  };

  createComponent = (componentName: string) => {
    shell.cd('src');
    shell.cd('components');
    shell.mkdir(componentName);
    shell.cd(componentName);
    shell.touch(`${componentName}.module.scss`);
    shell.touch(`${componentName}.js`);
    shell.exec(`echo "${jsFunctionalComponentTemplate(componentName)}" >> ${componentName}.js`);
  };

  checkSrcDirectory = async () => {
    const dirContent = await readdir(process.cwd());
    if (dirContent.includes('src')) {
      return true;
    }

    return false;
  };

  checkComponentsDirectory = async () => {
    const srcContent = await readdir(`${process.cwd()}/src`);
    if (srcContent.includes('components')) {
      console.log('components already exists !');
      return true;
    }

    return false;
  };

  createComponentsDirectory = () => {
    shell.cd('src');
    shell.mkdir('components');
  };

  createSrcDirectory = () => {
    shell.mkdir('src');
  };
}
