import { prompt } from 'enquirer';
import shell from 'shelljs';
import { cyan } from 'colors';
import { createIndexTemplate } from '../templates';
import { FsUtil } from '../FsUtil';

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

  fsUtil;

  constructor() {
    this.fsUtil = new FsUtil();
  }

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

      console.info(`executing : ${cyan(`${command}`)}`);
      console.log(`\nSit back and relax we're taking care of everything ! 😁`);
      //todo await shell.exec(command);
      shell.cd(this.appName);
      this.installPackages();
      this.createTemplates();
      console.info(cyan('\nAll done!'));
      console.log(`\nYou can now type ${cyan(`cd ${this.appName}`)} and start an amazing project.`);
      console.info(cyan('\nHappy Coding !'));
    } catch (e) {
      console.error('An error occured! Please try again.');
      process.exit(1);
    }
  };

  installPackages = () => {
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

      //todo shell.exec(command);
    }
  };

  createTemplates = () => {
    const { useRedux, useSass, useRouter } = this;
    const extension = this.useTypescript ? 'tsx' : 'js';
    const indexTemplate = createIndexTemplate({ useRedux, useRouter, useSass });

    if (this.fsUtil.checkSrcDirectory()) {
      shell.cd('src');
      shell.touch(`index.${extension}`);
      shell.exec(`echo "${indexTemplate}" > index.${extension}`);
    } else {
      console.error('No src directory found. Could not create templates');
      return;
    }

    /**
     *  todo Create the app template based on the installed modules
     *  todo Create the store if redux is installed
     *  todo Create a version for JS and one for TS
     * */
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
