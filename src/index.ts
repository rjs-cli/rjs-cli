#! /usr/bin/env node
import { program } from 'commander';
import { App } from './App';
import { Component } from './Component';

const app = new App();
const component = new Component();

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
    'Generates a componente with a stylesheet associated with [type] = css | scss',
  )
  .option('-m, --uses-modules', 'Wheter or not to use the so called css modules', false)
  .action(component.generate);
program
  .command('gc <name> [dir]')
  .description('Generates a component with a <name> and an optionnal [dir]')
  .option('-t, --typescript', 'Generates a component with typescript', false)
  .option('-c, --is-class-based', 'Generates a class based component', false)
  .option(
    '-s, --with-styles [type]',
    'Generates a componente with a stylesheet associated with [type] = css | scss',
  )
  .option('-m, --uses-modules', 'Wheter or not to use the so called css modules', false)
  .action(component.generate);

program.parse(process.argv);
