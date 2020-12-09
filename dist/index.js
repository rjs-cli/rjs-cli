#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var App_1 = require("./App");
var Component_1 = require("./Component");
var app = new App_1.App();
var component = new Component_1.Component();
commander_1.program.version('0.0.1');
commander_1.program
    .command('init [app-name]')
    .description('Uses create-react-app to create a new react app')
    .option('-i, --interactive', 'Starts the interactive mode', false)
    .option('-t, --use-typescript', 'Uses typescript template to create react app', false)
    .option("-r, --use-router", "Bootstraps a react app with built in react router", false)
    .option("-S, --use-sass", 'Bootstraps a react app with built in node-sass', false)
    .option("-R, --use-redux", "Bootstraps a react app with built in Redux", false)
    .action(app.createReactApp);
commander_1.program
    .command('generate-component <name> [dir]')
    .description('Generates a component with a <name> and an optionnal [dir]')
    .option('-t, --use-typescript', 'Generates a component with typescript')
    .option('-c, --is-class-based', 'Generates a class based component', false)
    .option('-s, --use-styles [type]', 'Generates a componente with a stylesheet associated with [type] = css | scss')
    .option('-m, --use-modules', 'Wheter or not to use the so called css modules', false)
    .action(component.generate);
commander_1.program
    .command('gc <name> [dir]')
    .description('Generates a component with a <name> and an optionnal [dir]')
    .option('-t, --use-typescript', 'Generates a component with typescript', false)
    .option('-c, --is-class-based', 'Generates a class based component', false)
    .option('-s, --use-styles [type]', 'Generates a componente with a stylesheet associated with [type] = css | scss')
    .option('-m, --use-modules', 'Wheter or not to use the so called css modules', false)
    .action(component.generate);
commander_1.program.parse(process.argv);
