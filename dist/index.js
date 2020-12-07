#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var App_1 = require("./App");
var app = new App_1.App();
commander_1.program.version('0.0.1');
commander_1.program
    .command('init [app-name]')
    .description('Uses create-react-app to create a new react app')
    .option('-i, --interactive', 'Starts the interactive mode')
    .option('-t, --typescript', 'Uses typescript template to create react app')
    .action(app.createReactApp);
commander_1.program
    .command('generate-component <name> [dir]')
    .description('Generates a component with a <name> and an optionnal [dir]')
    .option('-t, --typescript', 'Generates a component with typescript')
    .option('-c, --class', 'Generates a class based component', false)
    .option('-s, --with-styles [type]', 'Generates a componente with a stylesheet associated with [type] = css | scss | css-module | scss-module', 'css')
    .action(app.generateComponent);
commander_1.program
    .command('gc <name> [dir]')
    .description('Generates a component with a <name> and an optionnal [dir]')
    .option('-t, --typescript', 'Generates a component with typescript')
    .option('-c, --class', 'Generates a class based component', false)
    .option('-s, --with-styles [type]', 'Generates a componente with a stylesheet associated with [type] = css | scss | css-module | scss-module', 'css')
    .action(app.generateComponent);
commander_1.program.parse(process.argv);
