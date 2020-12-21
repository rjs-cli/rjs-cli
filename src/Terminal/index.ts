import os from 'os';
import path from 'path';
import chalk from 'chalk';
import shell from 'shelljs';

class Terminal {
  navigateTo = (pathArray: string[]) =>
    shell.cd(pathArray.reduce((prev, curr) => path.join(prev, curr)));

  goBack = (times: number) => {
    for (let i = 0; i < times; i++) {
      shell.cd('..');
    }
  };

  executeCommand = (command: string) => shell.exec(command);

  successMessage = (message: any) =>
    console.info(chalk.greenBright.italic(os.EOL + message + os.EOL));

  errorMessage = (message: any) => console.info(chalk.red.italic(os.EOL + message + os.EOL));

  debugMessage = (message: any) => console.info(`Debug : ${chalk.bgBlack.redBright(message)}`);
}

export const terminal = new Terminal();
