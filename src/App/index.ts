import { prompt } from 'enquirer';
import shell from 'shelljs';
import { cyan } from 'chalk';
import {
  createIndexScriptTemplate,
  createAppTemplate,
  createIndexStyleTemplate,
  createScssVariablesTemplate,
  createStyleReset,
} from '../templates';
import { fsUtil } from '../FsUtil';
import { terminal } from '../Terminal';
import { store } from '../Store';

interface CreateReactAppOptions {
  useTypescript: boolean;
  interactive: boolean;
  useRouter: boolean;
  useRedux: boolean;
  useSass: boolean;
  useModules: boolean;
  useAxios: boolean;
}

type Package =
  | 'react-router-dom'
  | '@types/react-router-dom'
  | 'redux'
  | '@types/redux'
  | 'react-redux'
  | '@types/react-redux'
  | 'node-sass'
  | 'axios'
  | '';

interface AppPackages {
  router: { prod: Package; dev: Package };
  sass: { dev: Package };
  redux: { prod: Package };
  reactRedux: { prod: Package; dev: Package };
  axios: { prod: Package };
}

interface CreateTemplateParams {
  template?: string;
  name: string;
  type: 'script' | 'style';
  scriptExtension?: 'tsx' | 'ts' | 'jsx' | 'js';
  module?: boolean;
}

export class App {
  appName: string = '';
  useTypescript: boolean = false;
  useRouter: boolean = false;
  useRedux: boolean = false;
  useSass: boolean = false;
  useModules: boolean = false;
  useAxios: boolean = false;
  packageManager: 'yarn' | 'npm' | 'pnpm' = 'yarn';
  appPackages: AppPackages = {
    router: { prod: 'react-router-dom', dev: '@types/react-router-dom' },
    sass: { dev: 'node-sass' },
    redux: { prod: 'redux' },
    reactRedux: { prod: 'react-redux', dev: '@types/react-redux' },
    axios: { prod: 'axios' },
  };

  prodPackages: Package[] = [];
  devPackages: Package[] = [];

  interactiveCreateReactApp = async (askName: boolean) => {
    if (askName) {
      const { appName }: { appName: string } = await prompt({
        type: 'input',
        name: 'appName',
        message: 'What is the name of the project ?',
        required: true,
      });

      this.appName = appName.replace(/\s/g, '-');
    }

    this.useTypescript = await this.togglePrompt(
      'useTypescript',
      'Would you like to use typescript in your project ?',
    );
    this.useSass = await this.togglePrompt('useSass', 'Do you plan on using sass ?');
    this.useModules = await this.togglePrompt(
      'useModules',
      'Do you want to use css/scss modules ?',
    );
    this.useRedux = await this.togglePrompt(
      'useRedux',
      'Do you need redux as your state management ?',
    );
    this.useRouter = await this.togglePrompt('useRouter', 'Do you need a some sort of router ?');
    this.useAxios = await this.togglePrompt('useAxios', 'Will you need Axios ?');
  };

  togglePrompt = async (name: string, message: string) => {
    const response = await prompt({
      type: 'toggle',
      name,
      message,
      required: true,
    });
    return Object.values(response).pop();
  };

  createReactApp = async (
    appName: string,
    {
      useTypescript,
      interactive,
      useRouter,
      useRedux,
      useSass,
      useModules,
      useAxios,
    }: CreateReactAppOptions,
  ) => {
    try {
      this.appName = appName;
      this.useTypescript = useTypescript;
      this.useRouter = useRouter;
      this.useRedux = useRedux;
      this.useSass = useSass;
      this.useModules = useModules;
      this.useAxios = useAxios;

      if (interactive || !this.appName) {
        await this.interactiveCreateReactApp(!this.appName);
      }

      let command = `npx create-react-app ${this.appName}`;
      if (this.useTypescript) {
        command += ` --template typescript`;
      }

      console.info(`\nexecuting : ${cyan(`${command}`)}`);
      console.log(`Sit back and relax we're taking care of everything ! 😁`);
      // await shell.exec(command);
      const { code } = shell.cd(this.appName);
      if (code) {
        console.error(`An error occured, seems like the folder ${this.appName} doesn't exist.`);
        process.exit(code);
      }
      await this.installPackages();
      await this.createTemplates();
      await this.createAssetsFolder();
      if (this.useRedux) {
        await this.createStoreFolder();
      }

      console.info(cyan('\nAll done!'));
      console.log(
        `\nYou can now type ${cyan(`cd ${this.appName}`)} and ${cyan(
          `${this.packageManager} start`,
        )} an amazing project.`,
      );
      console.info(cyan('\nHappy Coding !'));
    } catch (e) {
      console.error('An error occured! Please try again.');
      process.exit(1);
    }
  };

  installPackages = async () => {
    await fsUtil.goToRootDir();
    const baseCommand = `${this.packageManager} add`;
    let command = baseCommand;

    if (this.useRouter) {
      this.addPackage(this.useRouter, 'prodPackages', this.appPackages.router.prod);
      this.addPackage(this.useTypescript, 'devPackages', this.appPackages.router.dev);
    }

    if (this.useRedux) {
      this.addPackage(this.useRedux, 'prodPackages', this.appPackages.redux.prod);
      this.addPackage(this.useRedux, 'prodPackages', this.appPackages.reactRedux.prod);
      this.addPackage(this.useTypescript, 'devPackages', this.appPackages.reactRedux.dev);
    }

    if (this.useAxios) {
      this.addPackage(this.useAxios, 'prodPackages', this.appPackages.axios.prod);
    }

    this.addPackage(this.useSass, 'devPackages', this.appPackages.sass.dev);

    if (this.hasProdPackages()) {
      command += ` ${this.prodPackages.join(' ')}`;
    }

    if (this.hasProdAndDevPackages()) {
      command += ` && ${baseCommand} -D ${this.devPackages.join(' ')}`;
    } else if (this.hasDevPackages()) {
      command += ` -D ${this.devPackages.join(' ')}`;
    }

    if (command !== baseCommand) {
      console.log('\n' + command);

      // todo
      shell.exec(command);
    }
  };

  createTemplates = async () => {
    if (await fsUtil.checkSrcDirectory()) {
      const { useRedux, useSass, useRouter, useModules, useTypescript } = this;
      const indexScriptTemplate = createIndexScriptTemplate({ useRedux, useRouter, useSass });
      const appTemplate = createAppTemplate({
        componentName: 'App',
        styleExtension: useSass ? 'scss' : 'css',
        useModules,
        useTypescript,
      });

      terminal.navigateTo(['src']);

      this.createTemplate({
        name: 'index',
        template: indexScriptTemplate,
        type: 'script',
      });

      await fsUtil.checkAndCreateDir('App');
      terminal.navigateTo(['App']);

      this.createTemplate({ name: 'App', template: appTemplate, type: 'script' });
      this.createTemplate({ name: 'App', type: 'style' });

      // this will put you back in "src"
      terminal.goBack(1);
    } else {
      console.error('\nNo src directory found. Could not create templates');
      return;
    }

    /**
     *  todo Create the app template based on the installed modules
     *  todo Create the store if redux is installed
     *  todo Create a version for JS and one for TS
     * */
  };
  createTemplate = ({
    name,
    template,
    type,
    scriptExtension,
    module = this.useModules,
  }: CreateTemplateParams) => {
    const styleModule = module ? 'module.' : '';
    let extension, filename, writeCommand;

    if (type === 'script') {
      extension = scriptExtension ? scriptExtension : this.useTypescript ? 'tsx' : 'js';
      console.log({ extension, scriptExtension });
      filename = `${name}.${extension}`;
      writeCommand = `echo "${template}" > ${name}.${extension}`;
    } else {
      extension = this.useSass ? 'scss' : 'css';
      filename = `${name}.${styleModule}${extension}`;
      writeCommand = `echo "${template}" > ${name}.${styleModule}${extension}`;
    }

    fsUtil.createFile(filename);

    if (template) {
      terminal.executeCommand(writeCommand);
    }
  };

  createAssetsFolder = async () => {
    const { useSass } = this;
    const scssVariablesTemplate = createScssVariablesTemplate();
    const styleResetTemplate = createStyleReset();
    const indexStyleTemplate = createIndexStyleTemplate({ useSass: this.useSass });

    const styleFolder = this.useSass ? 'scss' : 'css';

    await fsUtil.checkAndCreateDir('assets');
    terminal.navigateTo(['assets']);

    await fsUtil.checkAndCreateDir('images');

    await fsUtil.checkAndCreateDir(styleFolder);
    terminal.navigateTo([styleFolder]);

    this.createTemplate({
      name: 'index',
      template: indexStyleTemplate,
      type: 'style',
      module: false,
    });
    if (useSass) {
      this.createTemplate({ name: '_variables', template: scssVariablesTemplate, type: 'style' });
    }

    this.createTemplate({
      name: useSass ? '_reset' : 'reset',
      type: 'style',
      template: styleResetTemplate,
    });

    terminal.goBack(2);
  };

  createStoreFolder = async () => {
    await store.create();
    this.createTemplate({
      name: 'index',
      type: 'script',
      scriptExtension: 'ts',
      template: '// this is the store template',
    });

    terminal.goBack(1);
  };

  hasProdPackages = () => this.prodPackages.length;
  hasDevPackages = () => this.devPackages.length;

  hasProdAndDevPackages = () => this.hasDevPackages() && this.hasProdPackages();

  addPackage = (
    usePackage: boolean,
    target: 'devPackages' | 'prodPackages',
    packageName: Package,
  ) => (usePackage ? this[target].push(packageName) : '');
}
