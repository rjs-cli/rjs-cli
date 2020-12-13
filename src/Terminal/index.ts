import path from 'path';
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
}

export const terminal = new Terminal();
