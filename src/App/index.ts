import { prompt } from 'enquirer';

interface CreateReactAppOptions {
  typescript: boolean;
  interactive: boolean;
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
}
