#! /usr/bin/env node
import { program } from 'commander';
import { App } from './App';

const app = new App();

program.version('0.0.1');
program
  .command('init <name>')
  .option('-t, --typescript', 'Uses typescript template to create react app')
  .action(app.createReactApp);

program
  .command('generate-component <name> [dir]')
  .option('-t, --typescript', 'Generates a component with typescript')
  .option('-s, --withStyles [type]', 'Generates a componente with a stylesheet associated', 'css')
  .action(app.generateComponent);

program.parse(process.argv);
