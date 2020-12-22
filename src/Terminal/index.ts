import os from 'os';
import path from 'path';
import chalk from 'chalk';
import shell from 'shelljs';

export class Terminal {
  public static navigateTo = (pathArray: string[]) =>
    shell.cd(pathArray.reduce((prev, curr) => path.join(prev, curr)));

  public static goBack = (times: number) => {
    for (let i = 0; i < times; i++) {
      shell.cd('..');
    }
  };

  public static executeCommand = (command: string) => shell.exec(command);

  public static successMessage = (message: any) =>
    console.info(chalk.greenBright.italic(os.EOL + message + os.EOL));

  public static errorMessage = (message: any) =>
    console.info(chalk.red.italic(os.EOL + message + os.EOL));

  public static debugMessage = (message: any) =>
    console.info(`Debug : ${chalk.bgBlack.redBright(message)}`);
}
