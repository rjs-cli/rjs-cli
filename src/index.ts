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
  .option('-i, --interactive', 'Starts the interactive mode', false)
  .option('-t, --use-typescript', 'Uses typescript template to create react app', false)
  .option('-r, --use-router', 'Bootstraps a react app with built in react router', false)
  .option('-S, --use-sass', 'Bootstraps a react app with built in node-sass', false)
  .option('-R, --use-redux', 'Bootstraps a react app with built in Redux', false)
  .option('-a, --use-axios', 'Bootstraps a react app with built in Axios', false)
  .action(app.createReactApp);

program
  .command('generate-component <name> [dir]')
  .description('Generates a component with a <name> and an optionnal [dir]')
  .option('-t, --use-typescript', 'Generates a component with typescript')
  .option('-c, --is-class-based', 'Generates a class based component', false)
  .option(
    '-s, --use-styles [type]',
    'Generates a componente with a stylesheet associated with [type] = css | scss',
  )
  .option('-m, --use-modules', 'Wheter or not to use the so called css modules', false)
  .action(component.generate);

program
  .command('gc <name> [dir]')
  .description('Generates a component with a <name> and an optionnal [dir]')
  .option('-t, --use-typescript', 'Generates a component with typescript', false)
  .option('-c, --is-class-based', 'Generates a class based component', false)
  .option(
    '-s, --use-styles [type]',
    'Generates a componente with a stylesheet associated with [type] = css | scss',
  )
  .option('-m, --use-modules', 'Wheter or not to use the so called css modules', false)
  .action(component.generate);

program.parse(process.argv);
