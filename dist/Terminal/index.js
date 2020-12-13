"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.terminal = void 0;
var path_1 = __importDefault(require("path"));
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
    }
    return Terminal;
}());
exports.terminal = new Terminal();
