"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var promises_1 = require("fs/promises");
var commander_1 = require("commander");
var shelljs_1 = __importDefault(require("shelljs"));
var utils_1 = require("../utils");
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.usesTypescript = function () {
            return !!commander_1.program.typescript || !!commander_1.program.t ? true : false;
        };
        this.createReactApp = function (dir) {
            // const appDirectory = `${process.cwd()}/${dir}`;
            var command = "npx create-react-app " + dir;
            if (_this.usesTypescript()) {
                command += " --template typescript";
            }
            console.log(command);
            shelljs_1.default.exec(command);
        };
        //@ts-ignore
        this.generateComponent = function (componentName, componentDir, _a) {
            var withStyles = _a.withStyles, typescript = _a.typescript;
            return __awaiter(_this, void 0, void 0, function () {
                var message, hasSrcDir, hasComponentsDir, componentDirPath;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            message = "Generating " + componentName + " component";
                            if (typescript) {
                                message += ' with typescript';
                            }
                            if (withStyles && ['css', 'scss'].includes(withStyles)) {
                                if (typescript) {
                                    message += ' and';
                                }
                                message += " " + withStyles;
                            }
                            if (componentDir) {
                                if (componentDir === '.') {
                                    console.info(message + " in " + shelljs_1.default.pwd() + "/");
                                }
                                else {
                                    console.info(message + " in " + shelljs_1.default.pwd() + "/" + componentDir);
                                }
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.checkSrcDirectory()];
                        case 1:
                            hasSrcDir = _b.sent();
                            if (!hasSrcDir) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.checkComponentsDirectory()];
                        case 2:
                            hasComponentsDir = _b.sent();
                            if (!hasComponentsDir) {
                                this.createComponentsDirectory();
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            this.createSrcDirectory();
                            this.createComponentsDirectory();
                            _b.label = 4;
                        case 4:
                            componentDirPath = shelljs_1.default.pwd() + "/src/components/" + componentName;
                            message += " in \"" + componentDirPath + "\"";
                            console.info(message + "...");
                            this.createComponent(componentName);
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.createComponent = function (componentName) {
            shelljs_1.default.cd('src');
            shelljs_1.default.cd('components');
            shelljs_1.default.mkdir(componentName);
            shelljs_1.default.cd(componentName);
            shelljs_1.default.touch(componentName + ".module.scss");
            shelljs_1.default.touch(componentName + ".js");
            shelljs_1.default.exec("echo \"" + utils_1.jsComponentTemplate(componentName) + "\" >> " + componentName + ".js");
        };
        this.checkSrcDirectory = function () { return __awaiter(_this, void 0, void 0, function () {
            var dirContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promises_1.readdir(process.cwd())];
                    case 1:
                        dirContent = _a.sent();
                        if (dirContent.includes('src')) {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/, false];
                }
            });
        }); };
        this.checkComponentsDirectory = function () { return __awaiter(_this, void 0, void 0, function () {
            var srcContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promises_1.readdir(process.cwd() + "/src")];
                    case 1:
                        srcContent = _a.sent();
                        if (srcContent.includes('components')) {
                            console.log('components already exists !');
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/, false];
                }
            });
        }); };
        this.createComponentsDirectory = function () {
            shelljs_1.default.cd('src');
            shelljs_1.default.mkdir('components');
        };
        this.createSrcDirectory = function () {
            shelljs_1.default.mkdir('src');
        };
    }
    return App;
}());
exports.App = App;
