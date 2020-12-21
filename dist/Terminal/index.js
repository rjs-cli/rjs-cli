"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.terminal = void 0;
var os_1 = __importDefault(require("os"));
var path_1 = __importDefault(require("path"));
var chalk_1 = __importDefault(require("chalk"));
var shelljs_1 = __importDefault(require("shelljs"));
var Terminal = /** @class */ (function () {
    function Terminal() {
        this.navigateTo = function (pathArray) {
            return shelljs_1.default.cd(pathArray.reduce(function (prev, curr) { return path_1.default.join(prev, curr); }));
        };
        this.goBack = function (times) {
            for (var i = 0; i < times; i++) {
                shelljs_1.default.cd('..');
            }
        };
        this.executeCommand = function (command) { return shelljs_1.default.exec(command); };
        this.successMessage = function (message) {
            return console.info(chalk_1.default.greenBright.italic(os_1.default.EOL + message + os_1.default.EOL));
        };
        this.errorMessage = function (message) { return console.info(chalk_1.default.red.italic(os_1.default.EOL + message + os_1.default.EOL)); };
        this.debugMessage = function (message) { return console.info("Debug : " + chalk_1.default.bgBlack.redBright(message)); };
    }
    return Terminal;
}());
exports.terminal = new Terminal();
