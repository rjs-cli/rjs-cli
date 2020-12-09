import { prompt } from 'enquirer';
import shell from "shelljs";
import { cyan } from 'colors';

interface CreateReactAppOptions {
  useTypescript: boolean;
  interactive: boolean;
  useRouter: boolean;
  useRedux: boolean;
  useSass: boolean;
}

interface Package {
  value: 'react-router-dom' | 'redux' | 'react-redux' | 'node-sass' | '';
}

interface AppPackages {
  router: Package;
  sass: Package;
  redux: Package;
  reactRedux: Package;
}

export class App {
  appName: string = '';
  useTypescript: boolean = false;
  useRouter: boolean = false;
  useRedux: boolean = false;
  useSass: boolean = false;
  packageManager: "yarn" | "npm" | "pnpm" = "yarn";
  devPackages: string[] = [];

  // todo interactive creating
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
    this.useTypescript = typescript;
  };

  createReactApp = async (appName: string, { useTypescript, interactive, useRouter, useRedux, useSass }: CreateReactAppOptions) => {
    try {
      this.appName = appName;
      this.useTypescript = useTypescript;
      this.useRouter = useRouter;
      this.useRedux = useRedux;
      this.useSass = useSass

      if (interactive || !appName) {
        await this.interactiveCreateReactApp(!appName);
      }

      let command = `npx create-react-app ${appName}`;
      if (useTypescript) {
        command += ` --template typescript`;
      }


      console.info(`executing : ${cyan(`${command}`)}`);
      console.log(`\nSit back and relax we're taking care of everything ! 😁`);
      // shell.exec(command);
      // shell.cd(this.appName);
      this.installPackages();
      console.info(cyan("\nAll done!"));
      console.log(`\nYou can now type ${cyan(`cd ${this.appName}`)} and start an amazing project.`);
      console.info(cyan("\nHappy Coding !"));
    } catch (e) {
      console.error("An error occured! Please try again.");
      process.exit(1);
    }
  };

  installPackages = () => {
    const packages: AppPackages = {
      router: {
        value: 'react-router-dom'
      },
      sass: {
        value: 'node-sass',
      },
      redux: {
        value: 'redux'
      },
      reactRedux: {
        value: "react-redux"
      }
    }

    const baseCommand = `${this.packageManager} add`
    const types = '@types/'

    let command = baseCommand;
    if (this.useRouter) {
      command += ` ${packages.router.value}`;
      this.addDevPackage(this.useTypescript, `${types}${packages.router.value}`)
    } else {
      command = baseCommand;
    }

    if (this.useRedux) {
      command += ` ${packages.redux.value} ${packages.reactRedux.value}`;
      this.addDevPackage(this.useTypescript, `${types}${packages.redux.value}`)
      this.addDevPackage(this.useTypescript, `${types}${packages.reactRedux.value}`)
    } else {
      command = baseCommand;
    }

    this.addDevPackage(this.useSass, `${packages.sass.value}`)

    if (this.devPackages.length) {
      command += ` && ${baseCommand} -D ${this.devPackages.join(' ')}`
    }

    if (command !== baseCommand) {
      console.log('\n'+command);

      // shell.exec(command);
    }
  }

  addDevPackage = (usePackage: boolean, packageName: string) => usePackage ? this.devPackages.push(packageName) : '';
}
