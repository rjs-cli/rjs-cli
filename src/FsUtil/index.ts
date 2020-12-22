import { EOL } from 'os';
import { readdir, appendFile } from 'fs/promises';
import shell from 'shelljs';
import { Terminal } from '../Terminal';

class FsUtil {
  goToRootDir = async () => {
    try {
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

        Terminal.navigateTo(['..']);
        path = shell.pwd().stdout;
      } while (true);
    } catch (e) {
      Terminal.errorMessage(
        `${EOL}Looks like the directory you're currently in does not exist anymore, please retry in a valid directory${EOL}`,
      );
      process.exit(1);
    }
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

  createDirIfNotExists = async (name: string, directory?: string) => {
    if (!(await this.doesDirectoryExist(name, directory))) {
      this.createDirectory(directory ?? name);
    }
  };

  doesDirectoryExist = async (name: string, directory?: string) => {
    if (directory) {
      try {
        const dirContent = await readdir(directory);

        let regexMatch = false;
        const regex = new RegExp(name, 'gi');

        for (const item of dirContent) {
          if (item.match(regex)) regexMatch = true;
        }

        return regexMatch;
      } catch (e) {
        return false;
      }
    }

    const dirContent = await readdir(process.cwd());

    return dirContent.includes(name);
  };

  createDirectory = (dirname: string) => shell.mkdir('-p', dirname);

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
