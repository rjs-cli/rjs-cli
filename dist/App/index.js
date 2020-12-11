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
var colors_1 = require("colors");
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.appName = '';
        this.useTypescript = false;
        this.useRouter = false;
        this.useRedux = false;
        this.useSass = false;
        this.useAxios = false;
        this.packageManager = 'yarn';
        this.appPackages = {
            router: { prod: 'react-router-dom', dev: '@types/react-router-dom' },
            sass: { dev: 'node-sass' },
            redux: { prod: 'redux' },
            reactRedux: { prod: 'react-redux', dev: '@types/react-redux' },
            axios: { prod: 'axios' },
        };
        this.prodPackages = [];
        this.devPackages = [];
        this.interactiveCreateReactApp = function (askName) { return __awaiter(_this, void 0, void 0, function () {
            var appName, _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!askName) return [3 /*break*/, 2];
                        return [4 /*yield*/, enquirer_1.prompt({
                                type: 'input',
                                name: 'appName',
                                message: 'What is the name of the project ?',
                                required: true,
                            })];
                    case 1:
                        appName = (_f.sent()).appName;
                        this.appName = appName.replace(/\s/g, '-');
                        _f.label = 2;
                    case 2:
                        _a = this;
                        return [4 /*yield*/, this.togglePrompt('useTypescript', 'Would you like to use typescript in your project ?')];
                    case 3:
                        _a.useTypescript = _f.sent();
                        _b = this;
                        return [4 /*yield*/, this.togglePrompt('useSass', 'Do you plan on using sass ?')];
                    case 4:
                        _b.useSass = _f.sent();
                        _c = this;
                        return [4 /*yield*/, this.togglePrompt('useRedux', 'Do you need redux as your state management ?')];
                    case 5:
                        _c.useRedux = _f.sent();
                        _d = this;
                        return [4 /*yield*/, this.togglePrompt('useRouter', 'Do you need a some sort of router ?')];
                    case 6:
                        _d.useRouter = _f.sent();
                        _e = this;
                        return [4 /*yield*/, this.togglePrompt('useAxios', 'Will you need Axios ?')];
                    case 7:
                        _e.useAxios = _f.sent();
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
            var useTypescript = _a.useTypescript, interactive = _a.interactive, useRouter = _a.useRouter, useRedux = _a.useRedux, useSass = _a.useSass, useAxios = _a.useAxios;
            return __awaiter(_this, void 0, void 0, function () {
                var command, e_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 3, , 4]);
                            this.appName = appName;
                            this.useTypescript = useTypescript;
                            this.useRouter = useRouter;
                            this.useRedux = useRedux;
                            this.useSass = useSass;
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
                            console.info("executing : " + colors_1.cyan("" + command));
                            console.log("\nSit back and relax we're taking care of everything ! \uD83D\uDE01");
                            // await shell.exec(command);
                            // shell.cd(this.appName);
                            this.installPackages();
                            console.info(colors_1.cyan('\nAll done!'));
                            console.log("\nYou can now type " + colors_1.cyan("cd " + this.appName) + " and start an amazing project.");
                            console.info(colors_1.cyan('\nHappy Coding !'));
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _b.sent();
                            console.error('An error occured! Please try again.');
                            process.exit(1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        this.installPackages = function () {
            var baseCommand = _this.packageManager + " add";
            var command = baseCommand;
            if (_this.useRouter) {
                _this.addPackage(_this.useRouter, 'prodPackages', _this.appPackages.router.prod);
                _this.addPackage(_this.useTypescript, 'devPackages', _this.appPackages.router.dev);
            }
            if (_this.useRedux) {
                _this.addPackage(_this.useRedux, 'prodPackages', _this.appPackages.redux.prod);
                _this.addPackage(_this.useRedux, 'prodPackages', _this.appPackages.reactRedux.prod);
                _this.addPackage(_this.useTypescript, 'devPackages', _this.appPackages.reactRedux.dev);
            }
            if (_this.useAxios) {
                _this.addPackage(_this.useAxios, 'prodPackages', _this.appPackages.axios.prod);
            }
            _this.addPackage(_this.useSass, 'devPackages', _this.appPackages.sass.dev);
            if (_this.hasProdPackages()) {
                command += " " + _this.prodPackages.join(' ');
            }
            if (_this.hasProdAndDevPackages()) {
                command += " && " + baseCommand + " -D " + _this.devPackages.join(' ');
            }
            else if (_this.hasDevPackages()) {
                command += " -D " + _this.devPackages.join(' ');
            }
            if (command !== baseCommand) {
                console.log('\n' + command);
                // shell.exec(command);
            }
        };
        this.createTemplate = function () {
            /**
             *  todo Create the app template based on the installed modules
             *  todo Create the store if redux is installed
             *  todo Create a version for JS and one for TS
             * */
        };
        this.hasProdPackages = function () { return _this.prodPackages.length; };
        this.hasDevPackages = function () { return _this.devPackages.length; };
        this.hasProdAndDevPackages = function () { return _this.hasDevPackages() && _this.hasProdPackages(); };
        this.addPackage = function (usePackage, target, packageName) { return (usePackage ? _this[target].push(packageName) : ''); };
    }
    return App;
}());
exports.App = App;
