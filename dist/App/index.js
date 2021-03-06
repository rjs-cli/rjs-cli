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
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var enquirer_1 = require("enquirer");
var os_1 = require("os");
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
            var appName, _a, _b, _c, _d, _e, _f, packageManagerChoice;
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
                        return [4 /*yield*/, this.togglePrompt('useRouter', 'Do you need a router ?')];
                    case 7:
                        _e.useRouter = _g.sent();
                        _f = this;
                        return [4 /*yield*/, this.togglePrompt('useAxios', 'Are you going to use Axios ?')];
                    case 8:
                        _f.useAxios = _g.sent();
                        return [4 /*yield*/, enquirer_1.prompt({
                                name: 'packageManager',
                                choices: ['yarn', 'npm', 'pnpm'],
                                message: 'What package manager do you want to use ?',
                                type: 'select',
                            })];
                    case 9:
                        packageManagerChoice = _g.sent();
                        this.packageManager = packageManagerChoice.packageManager;
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
            var useTypescript = _a.useTypescript, interactive = _a.interactive, useRouter = _a.useRouter, useRedux = _a.useRedux, useSass = _a.useSass, useModules = _a.useModules, useAxios = _a.useAxios, useNpm = _a.useNpm;
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
                            // Default package manager is yarn
                            if (useNpm) {
                                this.packageManager = 'npm';
                            }
                            command = "npx create-react-app " + this.appName;
                            if (this.useTypescript) {
                                command += " --template typescript";
                            }
                            if (this.packageManager === 'npm') {
                                command += ' --use-npm';
                            }
                            console.info(os_1.EOL + "executing : " + chalk_1.cyan("" + command));
                            console.log("Sit back and relax we're taking care of everything ! \uD83D\uDE01");
                            Terminal_1.Terminal.executeCommand(command);
                            code = Terminal_1.Terminal.navigateTo([this.appName]).code;
                            if (code) {
                                Terminal_1.Terminal.errorMessage("An error occured, seems like the folder " + this.appName + " doesn't exist.");
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
            var BASE_COMMAND, command;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, FsUtil_1.fsUtil.goToRootDir()];
                    case 1:
                        _a.sent();
                        BASE_COMMAND = this.packageManager;
                        if (this.packageManager !== 'npm') {
                            BASE_COMMAND += ' add';
                        }
                        else {
                            BASE_COMMAND += ' i';
                        }
                        command = BASE_COMMAND;
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
                            command += " && " + BASE_COMMAND;
                            command +=
                                this.packageManager !== 'npm'
                                    ? " -D " + this.devPackages.join(' ')
                                    : " --save-dev " + this.devPackages.join(' ');
                        }
                        else if (this.hasDevPackages()) {
                            command +=
                                this.packageManager !== 'npm'
                                    ? " -D " + this.devPackages.join(' ')
                                    : " --save-dev " + this.devPackages.join(' ');
                        }
                        if (command !== BASE_COMMAND) {
                            console.log(os_1.EOL + command);
                            Terminal_1.Terminal.executeCommand(command);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.hasProdAndDevPackages = function () { return _this.hasDevPackages() && _this.hasProdPackages(); };
        this.hasProdPackages = function () { return _this.prodPackages.length; };
        this.hasDevPackages = function () { return _this.devPackages.length; };
        this.createTemplates = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, useRedux, useSass, useRouter, useModules, useTypescript, indexScriptTemplate, appTemplate, appTestTemplate, appStyleTemplate;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, FsUtil_1.fsUtil.checkSrcDirectory()];
                    case 1:
                        if (!_b.sent()) return [3 /*break*/, 4];
                        // Removes the cra templates for App and index
                        Terminal_1.Terminal.navigateTo(['src']);
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
                        appStyleTemplate = templates_1.createAppStyleTemplate(this.useSass ? 'scss' : 'css');
                        this.createTemplate({
                            name: 'index',
                            template: indexScriptTemplate,
                            type: 'script',
                        });
                        return [4 /*yield*/, FsUtil_1.fsUtil.createDirIfNotExists('App')];
                    case 3:
                        _b.sent();
                        Terminal_1.Terminal.navigateTo(['App']);
                        this.createTemplate({ name: 'App', template: appTemplate, type: 'script' });
                        this.createTemplate({
                            name: 'App',
                            template: appTestTemplate,
                            type: 'script',
                            scriptExtension: "test." + (useTypescript ? 'tsx' : 'js'),
                        });
                        this.createTemplate({
                            name: 'App',
                            template: appStyleTemplate,
                            type: 'style',
                        });
                        // this will put you back in "src"
                        Terminal_1.Terminal.goBack(1);
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
            var name = _a.name, _b = _a.template, template = _b === void 0 ? '' : _b, type = _a.type, scriptExtension = _a.scriptExtension, _c = _a.module, module = _c === void 0 ? _this.useModules : _c;
            var styleModule = module ? 'module.' : '';
            var extension, filename;
            if (type === 'script') {
                extension = scriptExtension ? scriptExtension : _this.useTypescript ? 'tsx' : 'js';
                filename = name + "." + extension;
            }
            else {
                extension = _this.useSass ? 'scss' : 'css';
                filename = name + "." + styleModule + extension;
            }
            FsUtil_1.fsUtil.writeFile(filename, template);
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
                        return [4 /*yield*/, FsUtil_1.fsUtil.createDirIfNotExists('assets')];
                    case 1:
                        _a.sent();
                        Terminal_1.Terminal.navigateTo(['assets']);
                        return [4 /*yield*/, FsUtil_1.fsUtil.createDirIfNotExists('images')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, FsUtil_1.fsUtil.createDirIfNotExists(styleFolder)];
                    case 3:
                        _a.sent();
                        Terminal_1.Terminal.navigateTo([styleFolder]);
                        this.createTemplate({
                            name: 'index',
                            template: indexStyleTemplate,
                            type: 'style',
                            module: false,
                        });
                        if (useSass) {
                            FsUtil_1.fsUtil.writeFile('_variables.scss', scssVariablesTemplate);
                        }
                        this.createTemplate({
                            name: useSass ? '_reset' : 'reset',
                            type: 'style',
                            template: styleResetTemplate,
                            module: false,
                        });
                        // This will put you back in "src"
                        Terminal_1.Terminal.goBack(2);
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
                        return [4 /*yield*/, FsUtil_1.fsUtil.createDirIfNotExists('middlewares')];
                    case 2:
                        _a.sent();
                        Terminal_1.Terminal.navigateTo(['middlewares']);
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
                        Terminal_1.Terminal.goBack(1);
                        return [4 /*yield*/, FsUtil_1.fsUtil.createDirIfNotExists('reducers')];
                    case 3:
                        _a.sent();
                        Terminal_1.Terminal.navigateTo(['reducers']);
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
                        Terminal_1.Terminal.goBack(1);
                        FsUtil_1.fsUtil.createDirIfNotExists('actions');
                        Terminal_1.Terminal.navigateTo(['actions']);
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
                        Terminal_1.Terminal.goBack(2);
                        return [2 /*return*/];
                }
            });
        }); };
        this.createContainersFolder = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, FsUtil_1.fsUtil.createDirIfNotExists('containers')];
                    case 1:
                        _a.sent();
                        Terminal_1.Terminal.navigateTo(['containers']);
                        return [4 /*yield*/, FsUtil_1.fsUtil.createDirIfNotExists('App')];
                    case 2:
                        _a.sent();
                        Terminal_1.Terminal.navigateTo(['App']);
                        this.createTemplate({
                            name: 'App',
                            type: 'script',
                            scriptExtension: this.useTypescript ? 'ts' : 'js',
                            template: templates_1.createAppContainerTemplate(this.useTypescript),
                        });
                        // this will put you back in "src"
                        Terminal_1.Terminal.goBack(2);
                        return [2 /*return*/];
                }
            });
        }); };
        this.addPackage = function (usePackage, target, packageName) { return (usePackage ? _this[target].push(packageName) : ''); };
    }
    return App;
}());
exports.App = App;
