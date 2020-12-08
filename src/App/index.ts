import { prompt } from 'enquirer';
import shell from "shelljs";

interface CreateReactAppOptions {
  typescript: boolean;
  interactive: boolean;
  withRouter: boolean;
}

export class App {
  appName: string = '';
  usesTypescript: boolean = false;
  withRouter: boolean = false;
  packageManager: "yarn" | "npm" | "pnpm" = "yarn";

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
    this.usesTypescript = typescript;
  };

  createReactApp = async (appName: string, { typescript, interactive, withRouter }: CreateReactAppOptions) => {
    try {
      this.appName = appName;
      this.usesTypescript = typescript;
      this.withRouter = withRouter;

      if (interactive || !appName) {
        await this.interactiveCreateReactApp(!appName);
      }

      let command = `npx create-react-app ${appName}`;
      if (typescript) {
        command += ` --template typescript`;
      }


      console.log(command);
      shell.exec(command);
      shell.cd(this.appName);
      this.installPackages();
    } catch (e) {
      console.error("An error occured! Please try again.");
      process.exit(1);
    }
  };

  installPackages = () => {
    let command = `${this.packageManager} `;
    if (this.withRouter) {
      command += ` add react-router-dom`;
      if (this.usesTypescript) {
        command += ` && ${this.packageManager} add -D @types/react-router-dom`;
      }
    }

    shell.exec(command);
  }
}
