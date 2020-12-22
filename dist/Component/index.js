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
exports.Component = void 0;
var path_1 = __importDefault(require("path"));
var os_1 = __importDefault(require("os"));
var shelljs_1 = __importDefault(require("shelljs"));
var templates_1 = require("../templates");
var FsUtil_1 = require("../FsUtil");
var Terminal_1 = require("../Terminal");
var Component = /** @class */ (function () {
    function Component() {
        var _this = this;
        this.name = '';
        this.directory = '';
        this.withStyles = null;
        this.useTypescript = false;
        this.useModules = false;
        this.isClassBased = false;
        this.message = '';
        this.generate = function (componentName, componentDir, _a) {
            var withStyles = _a.withStyles, useTypescript = _a.useTypescript, isClassBased = _a.class, useModules = _a.useModules;
            return __awaiter(_this, void 0, void 0, function () {
                var scriptType, styleExtension, modules, componentType, dirPath, separatorRegexp, splitPath, e_1, hasSrcDir, hasComponentsDir;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.name = componentName;
                            this.directory = componentDir;
                            this.useTypescript = useTypescript;
                            this.isClassBased = isClassBased;
                            this.useModules = useModules;
                            if (['css', 'scss'].includes(withStyles)) {
                                this.withStyles = withStyles;
                            }
                            scriptType = this.useTypescript ? 'typescript' : 'javascript';
                            styleExtension = this.withStyles && ['css', 'scss'].includes(this.withStyles);
                            modules = this.useModules ? 'modules' : '';
                            componentType = this.isClassBased ? 'class' : 'functionnal';
                            this.message = "Generating " + scriptType + " " + componentType + " component " + this.name + (styleExtension ? " with " + this.withStyles + " " + modules : '');
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 4, , 5]);
                            if (!this.directory) return [3 /*break*/, 3];
                            dirPath = void 0;
                            if (this.directory === '.') {
                                this.message += " in " + process.cwd();
                                dirPath = "" + process.cwd();
                                separatorRegexp = new RegExp(/[\/ | \\]/, 'g');
                                splitPath = dirPath.split(separatorRegexp);
                                if (splitPath[splitPath.length - 1] === 'src') {
                                    Terminal_1.Terminal.errorMessage("Cannot create component files in src directory. You must be inside a directory.\n              " + os_1.default.EOL + "Please navigate inside one or specify a directory name. " + os_1.default.EOL + "    example: rjs gc <name> [directory] [options]\n              ");
                                    process.exit(1);
                                }
                            }
                            else {
                                this.message += " in " + process.cwd() + "/" + this.directory;
                                dirPath = path_1.default.join(process.cwd(), this.directory);
                            }
                            if (!dirPath.includes('src')) {
                                Terminal_1.Terminal.errorMessage("You're not in the src directory of your app, cannot create components outside of src.");
                                process.exit(1);
                            }
                            return [4 /*yield*/, this.create(dirPath)];
                        case 2:
                            _b.sent();
                            process.exit(0);
                            _b.label = 3;
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            e_1 = _b.sent();
                            return [3 /*break*/, 5];
                        case 5: return [4 /*yield*/, FsUtil_1.fsUtil.checkSrcDirectory()];
                        case 6:
                            hasSrcDir = _b.sent();
                            if (!hasSrcDir) return [3 /*break*/, 8];
                            return [4 /*yield*/, FsUtil_1.fsUtil.checkComponentsDirectory()];
                        case 7:
                            hasComponentsDir = _b.sent();
                            if (!hasComponentsDir) {
                                FsUtil_1.fsUtil.createComponentsDirectory();
                            }
                            return [3 /*break*/, 9];
                        case 8:
                            FsUtil_1.fsUtil.createSrcDirectory();
                            FsUtil_1.fsUtil.createComponentsDirectory();
                            _b.label = 9;
                        case 9:
                            this.directory = path_1.default.join(shelljs_1.default.pwd().stdout, 'src', 'components', this.name);
                            this.message += " in \"" + this.directory + "\"";
                            Terminal_1.Terminal.navigateTo(['src', 'components']);
                            return [4 /*yield*/, this.create()];
                        case 10:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.checkExistence = function (dirPath) { return __awaiter(_this, void 0, void 0, function () {
            var alreadyExists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, FsUtil_1.fsUtil.doesDirectoryExist(this.name, dirPath)];
                    case 1:
                        alreadyExists = _a.sent();
                        if (alreadyExists) {
                            Terminal_1.Terminal.errorMessage("This component already exists, please choose a different name.");
                            process.exit(1);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.create = function (dirPath) { return __awaiter(_this, void 0, void 0, function () {
            var filename;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkExistence(dirPath)];
                    case 1:
                        _a.sent();
                        Terminal_1.Terminal.successMessage(this.message + "...");
                        if (!!dirPath) return [3 /*break*/, 3];
                        return [4 /*yield*/, FsUtil_1.fsUtil.createDirIfNotExists(this.name)];
                    case 2:
                        _a.sent();
                        Terminal_1.Terminal.navigateTo([this.name]);
                        return [3 /*break*/, 5];
                    case 3:
                        if (!(dirPath !== '.')) return [3 /*break*/, 5];
                        return [4 /*yield*/, FsUtil_1.fsUtil.createDirIfNotExists(this.name, this.directory)];
                    case 4:
                        _a.sent();
                        Terminal_1.Terminal.navigateTo([dirPath]);
                        _a.label = 5;
                    case 5:
                        if (!this.withStyles) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.createStyles()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        filename = this.useTypescript ? this.name + ".tsx" : this.name + ".js";
                        return [4 /*yield*/, FsUtil_1.fsUtil.writeFile(filename, this.createTemplate())];
                    case 8:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.createStyles = function () { return __awaiter(_this, void 0, void 0, function () {
            var extension, file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        extension = this.withStyles;
                        this.useModules
                            ? (file = this.name + ".module." + extension)
                            : (file = this.name + "." + extension);
                        return [4 /*yield*/, FsUtil_1.fsUtil.writeFile(file, "." + this.name + " {}")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.createTemplate = function () {
            var _a = _this, componentName = _a.name, styleExtension = _a.withStyles, useModules = _a.useModules, useTypescript = _a.useTypescript, isClassBased = _a.isClassBased;
            var template;
            if (isClassBased) {
                template = templates_1.createClassComponentTemplate({
                    componentName: componentName,
                    useModules: useModules,
                    useTypescript: useTypescript,
                    styleExtension: styleExtension,
                });
            }
            else {
                template = templates_1.createFunctionalComponentTemplate({
                    componentName: componentName,
                    useModules: useModules,
                    useTypescript: useTypescript,
                    styleExtension: styleExtension,
                });
            }
            return template;
        };
    }
    return Component;
}());
exports.Component = Component;
