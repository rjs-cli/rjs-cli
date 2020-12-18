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
var enquirer_1 = require("enquirer");
var os_1 = require("os");
var shelljs_1 = __importDefault(require("shelljs"));
var chalk_1 = require("chalk");
var templates_1 = require("../templates");
var FsUtil_1 = require("../FsUtil");
var Terminal_1 = require("../Terminal");
var Store_1 = require("../Store");
var utils_1 = require("../utils");
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.appName = '';
        this.useTypescript = false;
        this.useRouter = false;
        this.useRedux = false;
        this.useSass = false;
        this.useModules = false;
        this.useAxios = false;
        this.packageManager = 'yarn';
        this.appPackages = {
            router: { prod: 'react-router-dom', dev: '@types/react-router-dom' },
            sass: { dev: 'node-sass@4.14.1' },
            redux: { prod: 'redux' },
            reduxDevtools: { dev: 'redux-devtools-extension' },
            reactRedux: { prod: 'react-redux', dev: '@types/react-redux' },
            axios: { prod: 'axios' },
        };
        this.prodPackages = [];
        this.devPackages = [];
        this.interactiveCreateReactApp = function (askName) { return __awaiter(_this, void 0, void 0, function () {
            var appName, _a, _b, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (!askName) return [3 /*break*/, 2];
                        return [4 /*yield*/, enquirer_1.prompt({
                                type: 'input',
                                name: 'appName',
                                message: 'What is the name of the project ?',
                                required: true,
                            })];
                    case 1:
                        appName = (_g.sent()).appName;
                        this.appName = appName.replace(/\s/g, '-');
                        _g.label = 2;
                    case 2:
                        _a = this;
                        return [4 /*yield*/, this.togglePrompt('useTypescript', 'Would you like to use typescript in your project ?')];
                    case 3:
                        _a.useTypescript = _g.sent();
                        _b = this;
                        return [4 /*yield*/, this.togglePrompt('useSass', 'Do you plan on using sass ?')];
                    case 4:
                        _b.useSass = _g.sent();
                        _c = this;
                        return [4 /*yield*/, this.togglePrompt('useModules', 'Do you want to use css/scss modules ?')];
                    case 5:
                        _c.useModules = _g.sent();
                        _d = this;
                        return [4 /*yield*/, this.togglePrompt('useRedux', 'Do you need redux as your state management ?')];
                    case 6:
                        _d.useRedux = _g.sent();
                        _e = this;
                        return [4 /*yield*/, this.togglePrompt('useRouter', 'Do you need a some sort of router ?')];
                    case 7:
                        _e.useRouter = _g.sent();
                        _f = this;
                        return [4 /*yield*/, this.togglePrompt('useAxios', 'Will you need Axios ?')];
                    case 8:
                        _f.useAxios = _g.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.togglePrompt = function (name, message) { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, enquirer_1.prompt({
                            type: 'toggle',
                            name: name,
                            message: message,
                            required: true,
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, Object.values(response).pop()];
                }
            });
        }); };
        this.createReactApp = function (appName, _a) {
            var useTypescript = _a.useTypescript, interactive = _a.interactive, useRouter = _a.useRouter, useRedux = _a.useRedux, useSass = _a.useSass, useModules = _a.useModules, useAxios = _a.useAxios;
            return __awaiter(_this, void 0, void 0, function () {
                var command, code, e_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 9, , 10]);
                            this.appName = appName;
                            this.useTypescript = useTypescript;
                            this.useRouter = useRouter;
                            this.useRedux = useRedux;
                            this.useSass = useSass;
                            this.useModules = useModules;
                            this.useAxios = useAxios;
                            if (!(interactive || !this.appName)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.interactiveCreateReactApp(!this.appName)];
                        case 1:
                            _b.sent();
                            _b.label = 2;
                        case 2:
                            command = "npx create-react-app " + this.appName;
                            if (this.useTypescript) {
                                command += " --template typescript";
                            }
                            console.info(os_1.EOL + "executing : " + chalk_1.cyan("" + command));
                            console.log("Sit back and relax we're taking care of everything ! \uD83D\uDE01");
                            //TODO  _   _ _   _  ____ ___  __  __ __  __ _____ _   _ _____   ____  _____ _____ ___  ____  _____   ____  _____ _     _____    _    ____  _____
                            //TODO | | | | \ | |/ ___/ _ \|  \/  |  \/  | ____| \ | |_   _| | __ )| ____|  ___/ _ \|  _ \| ____| |  _ \| ____| |   | ____|  / \  / ___|| ____|
                            //TODO | | | |  \| | |  | | | | |\/| | |\/| |  _| |  \| | | |   |  _ \|  _| | |_ | | | | |_) |  _|   | |_) |  _| | |   |  _|   / _ \ \___ \|  _|
                            //TODO | |_| | |\  | |__| |_| | |  | | |  | | |___| |\  | | |   | |_) | |___|  _|| |_| |  _ <| |___  |  _ <| |___| |___| |___ / ___ \ ___) | |___
                            //TODO  \___/|_| \_|\____\___/|_|  |_|_|  |_|_____|_| \_| |_|   |____/|_____|_|   \___/|_| \_\_____| |_| \_\_____|_____|_____/_/   \_\____/|_____|
                            Terminal_1.terminal.executeCommand(command);
                            code = shelljs_1.default.cd(this.appName).code;
                            if (code) {
                                console.error("An error occured, seems like the folder " + this.appName + " doesn't exist.");
                                process.exit(code);
                            }
                            return [4 /*yield*/, this.createTemplates()];
                        case 3:
                            _b.sent();
                            return [4 /*yield*/, this.createAssetsFolder()];
                        case 4:
                            _b.sent();
                            if (!this.useRedux) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.createStoreFolder()];
                        case 5:
                            _b.sent();
                            return [4 /*yield*/, this.createContainersFolder()];
                        case 6:
                            _b.sent();
                            _b.label = 7;
                        case 7: return [4 /*yield*/, this.installPackages()];
                        case 8:
                            _b.sent();
                            console.info(chalk_1.cyan(os_1.EOL + "All done!"));
                            console.log(os_1.EOL + "You can now type " + chalk_1.cyan("cd " + this.appName) + " and " + chalk_1.cyan(this.packageManager + " start") + " an amazing project.");
                            console.info(chalk_1.cyan(os_1.EOL + "Happy Coding !"));
                            return [3 /*break*/, 10];
                        case 9:
                            e_1 = _b.sent();
                            console.error('An error occured! Please try again.');
                            process.exit(1);
                            return [3 /*break*/, 10];
                        case 10: return [2 /*return*/];
                    }
                });
            });
        };
        this.installPackages = function () { return __awaiter(_this, void 0, void 0, function () {
            var baseCommand, command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, FsUtil_1.fsUtil.goToRootDir()];
                    case 1:
                        _a.sent();
                        baseCommand = this.packageManager + " add";
                        command = baseCommand;
                        if (this.useRouter) {
                            this.addPackage(this.useRouter, 'prodPackages', this.appPackages.router.prod);
                            this.addPackage(this.useTypescript, 'devPackages', this.appPackages.router.dev);
                        }
                        if (this.useRedux) {
                            this.addPackage(this.useRedux, 'prodPackages', this.appPackages.redux.prod);
                            this.addPackage(this.useRedux, 'prodPackages', this.appPackages.reactRedux.prod);
                            this.addPackage(this.useRedux, 'devPackages', this.appPackages.reduxDevtools.dev);
                            this.addPackage(this.useTypescript, 'devPackages', this.appPackages.reactRedux.dev);
                        }
                        if (this.useAxios) {
                            this.addPackage(this.useAxios, 'prodPackages', this.appPackages.axios.prod);
                        }
                        this.addPackage(this.useSass, 'devPackages', this.appPackages.sass.dev);
                        if (this.hasProdPackages()) {
                            command += " " + this.prodPackages.join(' ');
                        }
                        if (this.hasProdAndDevPackages()) {
                            command += " && " + baseCommand + " -D " + this.devPackages.join(' ');
                        }
                        else if (this.hasDevPackages()) {
                            command += " -D " + this.devPackages.join(' ');
                        }
                        if (command !== baseCommand) {
                            console.log(os_1.EOL + command);
                            // TODO  _   _ _   _  ____ ___  __  __ __  __ _____ _   _ _____   ____  _____ _____ ___  ____  _____   ____  _____ _     _____    _    ____  _____
                            // TODO | | | | \ | |/ ___/ _ \|  \/  |  \/  | ____| \ | |_   _| | __ )| ____|  ___/ _ \|  _ \| ____| |  _ \| ____| |   | ____|  / \  / ___|| ____|
                            // TODO | | | |  \| | |  | | | | |\/| | |\/| |  _| |  \| | | |   |  _ \|  _| | |_ | | | | |_) |  _|   | |_) |  _| | |   |  _|   / _ \ \___ \|  _|
                            // TODO | |_| | |\  | |__| |_| | |  | | |  | | |___| |\  | | |   | |_) | |___|  _|| |_| |  _ <| |___  |  _ <| |___| |___| |___ / ___ \ ___) | |___
                            // TODO  \___/|_| \_|\____\___/|_|  |_|_|  |_|_____|_| \_| |_|   |____/|_____|_|   \___/|_| \_\_____| |_| \_\_____|_____|_____/_/   \_\____/|_____|
                            shelljs_1.default.exec(command);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.createTemplates = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, useRedux, useSass, useRouter, useModules, useTypescript, indexScriptTemplate, appTemplate, appTestTemplate;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, FsUtil_1.fsUtil.checkSrcDirectory()];
                    case 1:
                        if (!_b.sent()) return [3 /*break*/, 4];
                        // Removes the cra templates for App and index
                        Terminal_1.terminal.navigateTo(['src']);
                        return [4 /*yield*/, FsUtil_1.fsUtil.removeFilesFromRegexp(/\b(App|index)\b\.([test\.]{5})?[jtscx]{2,3}/gi)];
                    case 2:
                        _b.sent();
                        _a = this, useRedux = _a.useRedux, useSass = _a.useSass, useRouter = _a.useRouter, useModules = _a.useModules, useTypescript = _a.useTypescript;
                        indexScriptTemplate = templates_1.createIndexScriptTemplate({ useRedux: useRedux, useRouter: useRouter, useSass: useSass });
                        appTemplate = templates_1.createAppTemplate({
                            componentName: 'App',
                            styleExtension: useSass ? 'scss' : 'css',
                            useModules: useModules,
                            useTypescript: useTypescript,
                        });
                        appTestTemplate = templates_1.createAppTestTemplate();
                        this.createTemplate({
                            name: 'index',
                            template: indexScriptTemplate,
                            type: 'script',
                        });
                        return [4 /*yield*/, FsUtil_1.fsUtil.checkAndCreateDir('App')];
                    case 3:
                        _b.sent();
                        Terminal_1.terminal.navigateTo(['App']);
                        this.createTemplate({ name: 'App', template: appTemplate, type: 'script' });
                        this.createTemplate({
                            name: 'App',
                            template: appTestTemplate,
                            type: 'script',
                            scriptExtension: "test." + (useTypescript ? 'tsx' : 'js'),
                        });
                        this.createTemplate({ name: 'App', type: 'style' });
                        // this will put you back in "src"
                        Terminal_1.terminal.goBack(1);
                        return [3 /*break*/, 5];
                    case 4:
                        console.error(os_1.EOL + "No src directory found. Seems like something went wrong while creating your app.");
                        console.error("Please report this bug to " + utils_1.repo.issues);
                        process.exit(1);
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.createTemplate = function (_a) {
            var name = _a.name, template = _a.template, type = _a.type, scriptExtension = _a.scriptExtension, _b = _a.module, module = _b === void 0 ? _this.useModules : _b;
            var styleModule = module ? 'module.' : '';
            var extension, filename, writeCommand;
            if (type === 'script') {
                extension = scriptExtension ? scriptExtension : _this.useTypescript ? 'tsx' : 'js';
                filename = name + "." + extension;
                writeCommand = "echo \"" + template + "\" > " + name + "." + extension;
            }
            else {
                extension = _this.useSass ? 'scss' : 'css';
                filename = name + "." + styleModule + extension;
                writeCommand = "echo \"" + template + "\" > " + name + "." + styleModule + extension;
            }
            FsUtil_1.fsUtil.createFile(filename);
            if (template) {
                Terminal_1.terminal.executeCommand(writeCommand);
            }
        };
        this.createAssetsFolder = function () { return __awaiter(_this, void 0, void 0, function () {
            var useSass, scssVariablesTemplate, styleResetTemplate, indexStyleTemplate, styleFolder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        useSass = this.useSass;
                        scssVariablesTemplate = templates_1.createScssVariablesTemplate();
                        styleResetTemplate = templates_1.createStyleReset();
                        indexStyleTemplate = templates_1.createIndexStyleTemplate({ useSass: this.useSass });
                        styleFolder = useSass ? 'scss' : 'css';
                        return [4 /*yield*/, FsUtil_1.fsUtil.checkAndCreateDir('assets')];
                    case 1:
                        _a.sent();
                        Terminal_1.terminal.navigateTo(['assets']);
                        return [4 /*yield*/, FsUtil_1.fsUtil.checkAndCreateDir('images')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, FsUtil_1.fsUtil.checkAndCreateDir(styleFolder)];
                    case 3:
                        _a.sent();
                        Terminal_1.terminal.navigateTo([styleFolder]);
                        this.createTemplate({
                            name: 'index',
                            template: indexStyleTemplate,
                            type: 'style',
                            module: false,
                        });
                        if (useSass) {
                            Terminal_1.terminal.executeCommand("echo '" + scssVariablesTemplate + "' > _variables.scss");
                        }
                        this.createTemplate({
                            name: useSass ? '_reset' : 'reset',
                            type: 'style',
                            template: styleResetTemplate,
                            module: false,
                        });
                        // This will put you back in "src"
                        Terminal_1.terminal.goBack(2);
                        return [2 /*return*/];
                }
            });
        }); };
        this.createStoreFolder = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Store_1.store.create()];
                    case 1:
                        _a.sent();
                        this.createTemplate({
                            name: 'index',
                            type: 'script',
                            scriptExtension: this.useTypescript ? 'ts' : 'js',
                            template: templates_1.createStoreTemplate(),
                        });
                        return [4 /*yield*/, FsUtil_1.fsUtil.checkAndCreateDir('middlewares')];
                    case 2:
                        _a.sent();
                        Terminal_1.terminal.navigateTo(['middlewares']);
                        this.createTemplate({
                            name: 'middleware.template',
                            type: 'script',
                            scriptExtension: this.useTypescript ? 'ts' : 'js',
                            template: templates_1.createMiddlewareTemplate(this.useTypescript, this.useAxios),
                        });
                        this.createTemplate({
                            name: 'index',
                            type: 'script',
                            scriptExtension: this.useTypescript ? 'ts' : 'js',
                            template: "export { templateMiddleware } from './middleware.template'",
                        });
                        Terminal_1.terminal.goBack(1);
                        return [4 /*yield*/, FsUtil_1.fsUtil.checkAndCreateDir('reducers')];
                    case 3:
                        _a.sent();
                        Terminal_1.terminal.navigateTo(['reducers']);
                        this.createTemplate({
                            name: 'reducer.template',
                            type: 'script',
                            scriptExtension: this.useTypescript ? 'ts' : 'js',
                            template: templates_1.createReducerTemplate(this.useTypescript),
                        });
                        this.createTemplate({
                            name: 'index',
                            type: 'script',
                            scriptExtension: this.useTypescript ? 'ts' : 'js',
                            template: templates_1.createRootReducerTemplate(this.useTypescript),
                        });
                        Terminal_1.terminal.goBack(1);
                        FsUtil_1.fsUtil.checkAndCreateDir('actions');
                        Terminal_1.terminal.navigateTo(['actions']);
                        this.createTemplate({
                            name: 'actions.template',
                            type: 'script',
                            scriptExtension: this.useTypescript ? 'ts' : 'js',
                            template: templates_1.createActionTemplate(this.useTypescript),
                        });
                        this.createTemplate({
                            name: 'index',
                            type: 'script',
                            scriptExtension: this.useTypescript ? 'ts' : 'js',
                            template: "export * as actionsTemplate from './actions.template'",
                        });
                        // this will put you back in "src"
                        Terminal_1.terminal.goBack(2);
                        return [2 /*return*/];
                }
            });
        }); };
        this.createContainersFolder = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, FsUtil_1.fsUtil.checkAndCreateDir('containers')];
                    case 1:
                        _a.sent();
                        Terminal_1.terminal.navigateTo(['containers']);
                        return [4 /*yield*/, FsUtil_1.fsUtil.checkAndCreateDir('App')];
                    case 2:
                        _a.sent();
                        Terminal_1.terminal.navigateTo(['App']);
                        this.createTemplate({
                            name: 'App',
                            type: 'script',
                            scriptExtension: this.useTypescript ? 'ts' : 'js',
                            template: templates_1.createAppContainerTemplate(this.useTypescript),
                        });
                        // this will put you back in "src"
                        Terminal_1.terminal.goBack(2);
                        return [2 /*return*/];
                }
            });
        }); };
        this.addPackage = function (usePackage, target, packageName) { return (usePackage ? _this[target].push(packageName) : ''); };
        this.hasProdAndDevPackages = function () { return _this.hasDevPackages() && _this.hasProdPackages(); };
        this.hasProdPackages = function () { return _this.prodPackages.length; };
        this.hasDevPackages = function () { return _this.devPackages.length; };
    }
    return App;
}());
exports.App = App;
