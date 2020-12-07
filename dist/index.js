#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var App_1 = require("./App");
var app = new App_1.App();
commander_1.program.version('0.0.1');
commander_1.program
    .command('init <name>')
    .description('Uses create-react-app to create a new react app')
    .option('-t, --typescript', 'Uses typescript template to create react app')
    .action(app.createReactApp);
commander_1.program
    .command('generate-component <name> [dir]')
    .description('Generates a component with a <name> and an optionnal [dir]')
    .option('-t, --typescript', 'Generates a component with typescript')
    .option('-s, --withStyles [type]', 'Generates a componente with a stylesheet associated', 'css')
    .action(app.generateComponent);
commander_1.program.parse(process.argv);
