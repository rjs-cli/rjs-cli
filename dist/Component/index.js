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
var shelljs_1 = __importDefault(require("shelljs"));
var utils_1 = require("../utils");
var FsUtil_1 = require("../FsUtil");
var Component = /** @class */ (function () {
    function Component() {
        var _this = this;
        this.name = '';
        this.directory = '';
        this.useStyles = 'css';
        this.useTypescript = false;
        this.useModules = false;
        this.isClassBased = false;
        this.message = '';
        this.generate = function (componentName, componentDir, _a) {
            var useStyles = _a.useStyles, useTypescript = _a.useTypescript, isClassBased = _a.isClassBased, useModules = _a.useModules;
            return __awaiter(_this, void 0, void 0, function () {
                var hasSrcDir, hasComponentsDir;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.name = componentName;
                            this.directory = componentDir;
                            this.useStyles = useStyles;
                            this.useTypescript = useTypescript;
                            this.isClassBased = isClassBased;
                            this.useModules = useModules;
                            this.message = "Generating " + this.name + " component";
                            if (this.useTypescript) {
                                this.message += ' with typescript';
                            }
                            if (this.useStyles && ['css', 'scss'].includes(this.useStyles)) {
                                if (this.useTypescript) {
                                    this.message += ' and';
                                }
                                this.message += " " + this.useStyles;
                            }
                            if (!this.directory) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.checkExistance()
                                // todo create component
                            ];
                        case 1:
                            _b.sent();
                            // todo create component
                            if (this.directory === '.') {
                                console.info(this.message + " in " + shelljs_1.default.pwd() + "/");
                            }
                            else {
                                console.info(this.message + " in " + shelljs_1.default.pwd() + "/" + this.directory);
                            }
                            process.exit(0);
                            _b.label = 2;
                        case 2: return [4 /*yield*/, this.fsUtil.checkSrcDirectory()];
                        case 3:
                            hasSrcDir = _b.sent();
                            if (!hasSrcDir) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.fsUtil.checkComponentsDirectory()];
                        case 4:
                            hasComponentsDir = _b.sent();
                            if (!hasComponentsDir) {
                                this.fsUtil.createComponentsDirectory();
                            }
                            return [3 /*break*/, 6];
                        case 5:
                            this.fsUtil.createSrcDirectory();
                            this.fsUtil.createComponentsDirectory();
                            _b.label = 6;
                        case 6:
                            this.directory = shelljs_1.default.pwd() + "/src/components/" + this.name;
                            this.message += " in \"" + this.directory + "\"";
                            shelljs_1.default.cd('src/components');
                            return [4 /*yield*/, this.create()];
                        case 7:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.checkExistance = function () { return __awaiter(_this, void 0, void 0, function () {
            var alreadyExists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fsUtil.alreadyExists(this.name)];
                    case 1:
                        alreadyExists = _a.sent();
                        if (alreadyExists) {
                            console.error('This component already exists, please choose a different name.');
                            process.exit(1);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.create = function () { return __awaiter(_this, void 0, void 0, function () {
            var filename;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkExistance()];
                    case 1:
                        _a.sent();
                        console.info(this.message + "...");
                        shelljs_1.default.mkdir(this.name);
                        shelljs_1.default.cd(this.name);
                        if (this.useStyles) {
                            this.createStyles();
                        }
                        filename = this.createFile();
                        shelljs_1.default.exec("echo \"" + this.createTemplate() + "\" > " + filename);
                        return [2 /*return*/];
                }
            });
        }); };
        this.createStyles = function () {
            var extension = _this.useStyles;
            var file;
            _this.useModules
                ? file = _this.name + ".module." + extension
                : file = _this.name + "." + extension;
            shelljs_1.default.touch(file);
        };
        this.createFile = function () {
            var filename;
            _this.useTypescript
                ? filename = _this.name + ".tsx"
                : filename = _this.name + ".js";
            shelljs_1.default.touch(filename);
            return filename;
        };
        this.createTemplate = function () {
            var template;
            if (_this.isClassBased && _this.useTypescript) {
                template = utils_1.createTsClassComponentTemplate(_this.name, _this.useStyles, _this.useModules);
            }
            else if (_this.isClassBased && !_this.useTypescript) {
                template = utils_1.createJsClassComponentTemplate(_this.name, _this.useStyles, _this.useModules);
            }
            else if (!_this.isClassBased && _this.useTypescript) {
                template = utils_1.createTsFunctionalComponentTemplate(_this.name, _this.useStyles, _this.useModules);
            }
            else {
                template = utils_1.createJsFunctionalComponentTemplate(_this.name, _this.useStyles, _this.useModules);
            }
            return template;
        };
        this.fsUtil = new FsUtil_1.FsUtil();
    }
    return Component;
}());
exports.Component = Component;
