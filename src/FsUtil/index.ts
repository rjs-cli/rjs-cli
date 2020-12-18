import { readdir, appendFile } from 'fs/promises';
import shell from 'shelljs';
import { terminal } from '../Terminal';

class FsUtil {
  goToRootDir = async () => {
    let path = shell.pwd().stdout;
    let hasPackageJson = false;
    const timeout = setTimeout(() => {
      if (!hasPackageJson) {
        console.log('Could not find a package.json... Are you in the right directory ?');

        process.exit(1);
      }
    }, 40);
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
    this.createDirectory('components');
    shell.cd('..');
  };

  createSrcDirectory = () => {
    this.createDirectory('src');
  };

  writeFile = async (filename: string, data: string) => await appendFile(filename, data);

  checkAndCreateDir = async (name: string, directory?: string) => {
    if (!(await this.doesDirectoryExist(name, directory))) {
      this.createDirectory(name);
    }
  };

  doesDirectoryExist = async (name: string, directory?: string) => {
    const response = await readdir(directory ?? process.cwd());

    return response.includes(name);
  };

  createDirectory = (dirname: string) => shell.mkdir(dirname);

  removeFiles = async (files: string[]) => {
    for (const file of files) {
      const currentDirContent = await readdir(process.cwd());

      if (currentDirContent.includes(file)) {
        shell.rm(file);
      }
    }
  };

  removeFilesFromRegexp = async (regexp: RegExp) => {
    const currentDirContent = await readdir(process.cwd());

    for (const file of currentDirContent) {
      if (file.match(regexp)) {
        shell.rm(file);
      }
    }
  };
}

export const fsUtil = new FsUtil();
