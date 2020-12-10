import { prompt } from 'enquirer';
import shell from 'shelljs';
import { cyan } from 'colors';

interface CreateReactAppOptions {
  useTypescript: boolean;
  interactive: boolean;
  useRouter: boolean;
  useRedux: boolean;
  useSass: boolean;
}

type Package =
  | 'react-router-dom'
  | '@types/react-router-dom'
  | 'redux'
  | '@types/redux'
  | 'react-redux'
  | '@types/react-redux'
  | 'node-sass'
  | '';

interface AppPackages {
  router: { prod: Package; dev: Package };
  sass: Package;
  redux: { prod: Package; dev: Package };
  reactRedux: { prod: Package; dev: Package };
}

export class App {
  appName: string = '';
  useTypescript: boolean = false;
  useRouter: boolean = false;
  useRedux: boolean = false;
  useSass: boolean = false;
  packageManager: 'yarn' | 'npm' | 'pnpm' = 'yarn';
  appPackages: AppPackages = {
    router: { prod: 'react-router-dom', dev: '@types/react-router-dom' },
    sass: 'node-sass',
    redux: { prod: 'redux', dev: '@types/redux' },
    reactRedux: { prod: 'react-redux', dev: '@types/react-redux' },
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

      this.appName = appName.replace(/\s/g, '');
    }

    this.useTypescript = await this.togglePrompt(
      'useTypescript',
      'Would you like to use typescript in your project ?',
    );
    this.useSass = await this.togglePrompt('useSass', 'Do you plan on using sass ?');
    this.useRedux = await this.togglePrompt(
      'useRedux',
      'Do you need redux as your state management ?',
    );
    this.useRouter = await this.togglePrompt('useRouter', 'Do you need a router ?');
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
    { useTypescript, interactive, useRouter, useRedux, useSass }: CreateReactAppOptions,
  ) => {
    try {
      this.appName = appName;
      this.useTypescript = useTypescript;
      this.useRouter = useRouter;
      this.useRedux = useRedux;
      this.useSass = useSass;

      if (interactive || !this.appName) {
        await this.interactiveCreateReactApp(!this.appName);
      }

      let command = `npx create-react-app ${this.appName}`;
      if (this.useTypescript) {
        command += ` --template typescript`;
      }

      console.info(`executing : ${cyan(`${command}`)}`);
      console.log(`\nSit back and relax we're taking care of everything ! 😁`);
      // shell.exec(command);
      // shell.cd(this.appName);
      this.installPackages();
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
      this.addPackage(this.useTypescript, 'devPackages', this.appPackages.redux.dev);
      this.addPackage(this.useTypescript, 'devPackages', this.appPackages.reactRedux.dev);
    }

    this.addPackage(this.useSass, 'devPackages', this.appPackages.sass);

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

      // shell.exec(command);
    }
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
