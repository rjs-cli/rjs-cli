import { readdir } from 'fs/promises';
import shell from 'shelljs';

export class FsUtil {
  checkSrcDirectory = async () => {
    const dirContent = await readdir(process.cwd());
    if (dirContent.includes('src')) {
      return true;
    }

    return false;
  };

  checkComponentsDirectory = async () => {
    const srcContent = await readdir(`${process.cwd()}/src`);
    if (srcContent.includes('components')) {
      console.log('components already exists !');
      return true;
    }

    return false;
  };

  createComponentsDirectory = () => {
    shell.cd('src');
    shell.mkdir('components');
  };

  createSrcDirectory = () => {
    shell.mkdir('src');
  };
}
