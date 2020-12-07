#! /usr/bin/env node
import { program } from 'commander';
import { App } from './App';

const app = new App();

program.version('0.0.1');
program
  .command('init [app-name]')
  .description('Uses create-react-app to create a new react app')
  .option('-i, --interactive', 'Starts the interactive mode')
  .option('-t, --typescript', 'Uses typescript template to create react app')
  .action(app.createReactApp);
program
  .command('generate-component <name> [dir]')
  .description('Generates a component with a <name> and an optionnal [dir]')
  .option('-t, --typescript', 'Generates a component with typescript')
  .option('-c, --class', 'Generates a class based component', false)
  .option(
    '-s, --with-styles [type]',
    'Generates a componente with a stylesheet associated with [type] = css | scss | css-module | scss-module',
    'css',
  )
  .action(app.generateComponent);
program
  .command('gc <name> [dir]')
  .description('Generates a component with a <name> and an optionnal [dir]')
  .option('-t, --typescript', 'Generates a component with typescript')
  .option('-c, --class', 'Generates a class based component', false)
  .option(
    '-s, --with-styles [type]',
    'Generates a componente with a stylesheet associated with [type] = css | scss | css-module | scss-module',
    'css',
  )
  .action(app.generateComponent);

program.parse(process.argv);
