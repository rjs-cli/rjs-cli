import { prompt } from 'enquirer';
import { EOL } from 'os';
import { cyan } from 'chalk';
import {
  createIndexScriptTemplate,
  createAppTemplate,
  createAppTestTemplate,
  createAppContainerTemplate,
  createIndexStyleTemplate,
  createScssVariablesTemplate,
  createStyleReset,
  createStoreTemplate,
  createMiddlewareTemplate,
  createReducerTemplate,
  createRootReducerTemplate,
  createActionTemplate,
  createAppStyleTemplate,
} from '../templates';
import { fsUtil } from '../FsUtil';
import { Terminal } from '../Terminal';
import { store } from '../Store';
import { repo } from '../utils';
import shell from 'shelljs';

interface CreateReactAppOptions {
  useTypescript: boolean;
  interactive: boolean;
  useRouter: boolean;
  useRedux: boolean;
  useSass: boolean;
  useModules: boolean;
  useAxios: boolean;
  useNpm: boolean;
}

type Package =
  | 'react-router-dom'
  | '@types/react-router-dom'
  | 'redux'
  | '@types/redux'
  | 'react-redux'
  | '@types/react-redux'
  | 'node-sass@4.14.1'
  | 'axios'
  | 'redux-devtools-extension'
  | '';

type PackageManager = 'yarn' | 'npm';

interface AppPackages {
  router: { prod: Package; dev: Package };
  sass: { dev: Package };
  redux: { prod: Package };
  reduxDevtools: { dev: Package };
  reactRedux: { prod: Package; dev: Package };
  axios: { prod: Package };
}

interface CreateTemplateParams {
  template?: string;
  name: string;
  type: 'script' | 'style';
  scriptExtension?: 'tsx' | 'ts' | 'jsx' | 'js' | 'test.tsx' | 'test.js';
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
  packageManager: PackageManager = 'yarn';
  appPackages: AppPackages = {
    router: { prod: 'react-router-dom', dev: '@types/react-router-dom' },
    sass: { dev: 'node-sass@4.14.1' },
    redux: { prod: 'redux' },
    reduxDevtools: { dev: 'redux-devtools-extension' },
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
    this.useRouter = await this.togglePrompt('useRouter', 'Do you need a router ?');
    this.useAxios = await this.togglePrompt('useAxios', 'Are you going to use Axios ?');

    const packageManagerChoice: { packageManager: PackageManager } = await prompt({
      name: 'packageManager',
      choices: ['yarn', 'npm', 'pnpm'],
      message: 'What package manager do you want to use ?',
      type: 'select',
    });
    this.packageManager = packageManagerChoice.packageManager;
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
      useNpm,
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

      // Default package manager is yarn
      if (useNpm) {
        this.packageManager = 'npm';
      }

      let command = `npx create-react-app ${this.appName}`;
      if (this.useTypescript) {
        command += ` --template typescript`;
      }

      if (this.packageManager === 'npm') {
        command += ' --use-npm';
      }

      console.info(`${EOL}executing : ${cyan(`${command}`)}`);
      console.log(`Sit back and relax we're taking care of everything ! 😁`);

      Terminal.executeCommand(command);

      const { code } = Terminal.navigateTo([this.appName]);
      if (code) {
        Terminal.errorMessage(
          `An error occured, seems like the folder ${this.appName} doesn't exist.`,
        );
        process.exit(code);
      }

      await this.createTemplates();
      await this.createAssetsFolder();
      if (this.useRedux) {
        await this.createStoreFolder();
        await this.createContainersFolder();
      }
      await this.installPackages();

      console.info(cyan(`${EOL}All done!`));
      console.log(
        `${EOL}You can now type ${cyan(`cd ${this.appName}`)} and ${cyan(
          `${this.packageManager} start`,
        )} an amazing project.`,
      );
      console.info(cyan(`${EOL}Happy Coding !`));
    } catch (e) {
      console.error('An error occured! Please try again.');
      process.exit(1);
    }
  };

  installPackages = async () => {
    await fsUtil.goToRootDir();
    let BASE_COMMAND: string = this.packageManager;
    if (this.packageManager !== 'npm') {
      BASE_COMMAND += ' add';
    } else {
      BASE_COMMAND += ' i';
    }

    let command = BASE_COMMAND;

    if (this.useRouter) {
      this.addPackage(this.useRouter, 'prodPackages', this.appPackages.router.prod);
      this.addPackage(this.useTypescript, 'devPackages', this.appPackages.router.dev);
    }

    if (this.useRedux) {
      this.addPackage(this.useRedux, 'prodPackages', this.appPackages.redux.prod);
      this.addPackage(this.useRedux, 'prodPackages', this.appPackages.reactRedux.prod);
      this.addPackage(this.useRedux, 'devPackages', this.appPackages.reduxDevtools.dev);
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
      command += ` && ${BASE_COMMAND}`;

      command +=
        this.packageManager !== 'npm'
          ? ` -D ${this.devPackages.join(' ')}`
          : ` --save-dev ${this.devPackages.join(' ')}`;
    } else if (this.hasDevPackages()) {
      command +=
        this.packageManager !== 'npm'
          ? ` -D ${this.devPackages.join(' ')}`
          : ` --save-dev ${this.devPackages.join(' ')}`;
    }

    if (command !== BASE_COMMAND) {
      console.log(EOL + command);

      Terminal.executeCommand(command);
    }
  };

  hasProdAndDevPackages = () => this.hasDevPackages() && this.hasProdPackages();
  hasProdPackages = () => this.prodPackages.length;
  hasDevPackages = () => this.devPackages.length;

  createTemplates = async () => {
    if (await fsUtil.checkSrcDirectory()) {
      // Removes the cra templates for App and index
      Terminal.navigateTo(['src']);
      await fsUtil.removeFilesFromRegexp(/\b(App|index)\b\.([test\.]{5})?[jtscx]{2,3}/gi);

      const { useRedux, useSass, useRouter, useModules, useTypescript } = this;
      const indexScriptTemplate = createIndexScriptTemplate({ useRedux, useRouter, useSass });
      const appTemplate = createAppTemplate({
        componentName: 'App',
        styleExtension: useSass ? 'scss' : 'css',
        useModules,
        useTypescript,
      });
      const appTestTemplate = createAppTestTemplate();
      const appStyleTemplate = createAppStyleTemplate(this.useSass ? 'scss' : 'css');

      this.createTemplate({
        name: 'index',
        template: indexScriptTemplate,
        type: 'script',
      });

      await fsUtil.createDirIfNotExists('App');
      Terminal.navigateTo(['App']);

      this.createTemplate({ name: 'App', template: appTemplate, type: 'script' });
      this.createTemplate({
        name: 'App',
        template: appTestTemplate,
        type: 'script',
        scriptExtension: `test.${useTypescript ? 'tsx' : 'js'}` as 'test.tsx' | 'test.js',
      });
      this.createTemplate({
        name: 'App',
        template: appStyleTemplate,
        type: 'style',
      });

      // this will put you back in "src"
      Terminal.goBack(1);
    } else {
      console.error(
        `${EOL}No src directory found. Seems like something went wrong while creating your app.`,
      );
      console.error(`Please report this bug to ${repo.issues}`);
      process.exit(1);
    }
  };

  createTemplate = ({
    name,
    template = '',
    type,
    scriptExtension,
    module = this.useModules,
  }: CreateTemplateParams) => {
    const styleModule = module ? 'module.' : '';
    let extension, filename;

    if (type === 'script') {
      extension = scriptExtension ? scriptExtension : this.useTypescript ? 'tsx' : 'js';
      filename = `${name}.${extension}`;
    } else {
      extension = this.useSass ? 'scss' : 'css';
      filename = `${name}.${styleModule}${extension}`;
    }

    fsUtil.writeFile(filename, template);
  };

  createAssetsFolder = async () => {
    const { useSass } = this;
    const scssVariablesTemplate = createScssVariablesTemplate();

    const styleResetTemplate = createStyleReset();
    const indexStyleTemplate = createIndexStyleTemplate({ useSass: this.useSass });

    const styleFolder = useSass ? 'scss' : 'css';

    await fsUtil.createDirIfNotExists('assets');
    Terminal.navigateTo(['assets']);

    await fsUtil.createDirIfNotExists('images');

    await fsUtil.createDirIfNotExists(styleFolder);
    Terminal.navigateTo([styleFolder]);

    this.createTemplate({
      name: 'index',
      template: indexStyleTemplate,
      type: 'style',
      module: false,
    });

    if (useSass) {
      fsUtil.writeFile('_variables.scss', scssVariablesTemplate);
    }

    this.createTemplate({
      name: useSass ? '_reset' : 'reset',
      type: 'style',
      template: styleResetTemplate,
      module: false,
    });

    // This will put you back in "src"
    Terminal.goBack(2);
  };

  createStoreFolder = async () => {
    await store.create();
    this.createTemplate({
      name: 'index',
      type: 'script',
      scriptExtension: this.useTypescript ? 'ts' : 'js',
      template: createStoreTemplate(),
    });

    await fsUtil.createDirIfNotExists('middlewares');
    Terminal.navigateTo(['middlewares']);
    this.createTemplate({
      name: 'middleware.template',
      type: 'script',
      scriptExtension: this.useTypescript ? 'ts' : 'js',
      template: createMiddlewareTemplate(this.useTypescript, this.useAxios),
    });
    this.createTemplate({
      name: 'index',
      type: 'script',
      scriptExtension: this.useTypescript ? 'ts' : 'js',
      template: "export { templateMiddleware } from './middleware.template'",
    });
    Terminal.goBack(1);

    await fsUtil.createDirIfNotExists('reducers');
    Terminal.navigateTo(['reducers']);
    this.createTemplate({
      name: 'reducer.template',
      type: 'script',
      scriptExtension: this.useTypescript ? 'ts' : 'js',
      template: createReducerTemplate(this.useTypescript),
    });
    this.createTemplate({
      name: 'index',
      type: 'script',
      scriptExtension: this.useTypescript ? 'ts' : 'js',
      template: createRootReducerTemplate(this.useTypescript),
    });
    Terminal.goBack(1);

    fsUtil.createDirIfNotExists('actions');
    Terminal.navigateTo(['actions']);
    this.createTemplate({
      name: 'actions.template',
      type: 'script',
      scriptExtension: this.useTypescript ? 'ts' : 'js',
      template: createActionTemplate(this.useTypescript),
    });
    this.createTemplate({
      name: 'index',
      type: 'script',
      scriptExtension: this.useTypescript ? 'ts' : 'js',
      template: `export * as actionsTemplate from './actions.template'`,
    });
    // this will put you back in "src"
    Terminal.goBack(2);
  };

  createContainersFolder = async () => {
    await fsUtil.createDirIfNotExists('containers');
    Terminal.navigateTo(['containers']);
    await fsUtil.createDirIfNotExists('App');
    Terminal.navigateTo(['App']);
    this.createTemplate({
      name: 'App',
      type: 'script',
      scriptExtension: this.useTypescript ? 'ts' : 'js',
      template: createAppContainerTemplate(this.useTypescript),
    });

    // this will put you back in "src"
    Terminal.goBack(2);
  };

  addPackage = (
    usePackage: boolean,
    target: 'devPackages' | 'prodPackages',
    packageName: Package,
  ) => (usePackage ? this[target].push(packageName) : '');
}
