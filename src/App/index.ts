import { readdir } from 'fs/promises';
import { program } from 'commander';
import shell from 'shelljs';
import { mkdir } from 'fs';

export class App {
  usesTypescript = () => {
    return !!program.typescript || !!program.t ? true : false;
  };

  createReactApp = (dir: string) => {
    // const appDirectory = `${process.cwd()}/${dir}`;
    let command = `npx create-react-app ${dir}`;
    if (this.usesTypescript()) {
      command += ` --template typescript`;
    }
    console.log(command);
    shell.exec(command);
  };

  //@ts-ignore
  generateComponent = async (componentName, componentDir, { withStyles, typescript }) => {
    let message = `Generating ${componentName} component`;
    if (typescript) {
      message += ' with typescript';
    }

    if (withStyles && ['css', 'scss'].includes(withStyles)) {
      if (typescript) {
        message += ' and';
      }
      message += ` ${withStyles}`;
    }

    if (componentDir) {
      if (componentDir === '.') {
        console.info(`${message} in ${shell.pwd()}/`);
      } else {
        console.info(`${message} in ${shell.pwd()}/${componentDir}`);
      }
      return;
    }

    const hasSrcDir = await this.checkSrcDirectory();

    if (hasSrcDir) {
      const hasComponentsDir = await this.checkComponentsDirectory();

      if (!hasComponentsDir) {
        this.createComponentsDirectory();
      }
    } else {
      this.createSrcDirectory();
      this.createComponentsDirectory();
    }
    const componentDirPath = `${shell.pwd()}/src/components/${componentName}`;
    message += ` in "${componentDirPath}"`;

    console.info(`${message}...`);
  };

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
