import { readdir } from 'fs/promises';
import shell from 'shelljs';

export class FsUtil {
  goToRootDir = async () => {
    let path = shell.pwd().stdout;
    let hasPackageJson: boolean = false;
    const timeout = setTimeout(() => {
      if (!hasPackageJson) {
        console.log('No package.json found, exiting ...');

        process.exit(1);
      }
    }, 5000);
    do {
      const dirContent = await readdir(path);

      hasPackageJson = dirContent.includes('package.json');
      if (hasPackageJson) {
        clearTimeout(timeout);
        break;
      }

      shell.cd('../');
      path = shell.pwd().stdout;
    } while (true);

    // const splitPath = path.split('/');
    // return splitPath[splitPath.length - 1];
  };

  checkSrcDirectory = async () => {
    await this.goToRootDir();
    const appDir = shell.pwd().stdout;

    const dirContent = await readdir(appDir);

    if (dirContent.includes('src')) {
      return true;
    }

    return false;
  };

  checkComponentsDirectory = async () => {
    const srcContent = await readdir(`${process.cwd()}/src`);
    if (srcContent.includes('components')) {
      return true;
    }

    return false;
  };

  createComponentsDirectory = () => {
    shell.cd('src');
    shell.mkdir('components');
    shell.cd('..');
  };

  createSrcDirectory = () => {
    shell.mkdir('src');
  };

  alreadyExists = async (name: string) => {
    const response = await readdir(`${process.cwd()}`);

    return response.includes(name);
  };
}
