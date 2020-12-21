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
exports.fsUtil = void 0;
var os_1 = require("os");
var promises_1 = require("fs/promises");
var shelljs_1 = __importDefault(require("shelljs"));
var Terminal_1 = require("../Terminal");
var FsUtil = /** @class */ (function () {
    function FsUtil() {
        var _this = this;
        this.goToRootDir = function () { return __awaiter(_this, void 0, void 0, function () {
            var path, hasPackageJson_1, timeout, dirContent, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        path = shelljs_1.default.pwd().stdout;
                        hasPackageJson_1 = false;
                        timeout = setTimeout(function () {
                            if (!hasPackageJson_1) {
                                console.log('Could not find a package.json... Are you in the right directory ?');
                                process.exit(1);
                            }
                        }, 40);
                        _a.label = 1;
                    case 1: return [4 /*yield*/, promises_1.readdir(path)];
                    case 2:
                        dirContent = _a.sent();
                        hasPackageJson_1 = dirContent.includes('package.json');
                        if (hasPackageJson_1) {
                            clearTimeout(timeout);
                            return [3 /*break*/, 4];
                        }
                        Terminal_1.terminal.navigateTo(['..']);
                        path = shelljs_1.default.pwd().stdout;
                        _a.label = 3;
                    case 3:
                        if (true) return [3 /*break*/, 1];
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        Terminal_1.terminal.errorMessage(os_1.EOL + "Looks like the directory you're currently in does not exist anymore, please retry in a valid directory" + os_1.EOL);
                        process.exit(1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.checkSrcDirectory = function () { return __awaiter(_this, void 0, void 0, function () {
            var appDir, dirContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.goToRootDir()];
                    case 1:
                        _a.sent();
                        appDir = shelljs_1.default.pwd().stdout;
                        return [4 /*yield*/, promises_1.readdir(appDir)];
                    case 2:
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
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/, false];
                }
            });
        }); };
        this.createComponentsDirectory = function () {
            shelljs_1.default.cd('src');
            _this.createDirectory('components');
            shelljs_1.default.cd('..');
        };
        this.createSrcDirectory = function () {
            _this.createDirectory('src');
        };
        this.writeFile = function (filename, data) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, promises_1.appendFile(filename, data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); };
        this.createDirIfNotExists = function (name, directory) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.doesDirectoryExist(name, directory)];
                    case 1:
                        if (!(_a.sent())) {
                            this.createDirectory(directory !== null && directory !== void 0 ? directory : name);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.doesDirectoryExist = function (name, directory) { return __awaiter(_this, void 0, void 0, function () {
            var dirContent, regexMatch, regex, _i, dirContent_1, item, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, promises_1.readdir(directory !== null && directory !== void 0 ? directory : process.cwd())];
                    case 1:
                        dirContent = _a.sent();
                        regexMatch = false;
                        regex = new RegExp(name, 'gi');
                        for (_i = 0, dirContent_1 = dirContent; _i < dirContent_1.length; _i++) {
                            item = dirContent_1[_i];
                            if (item.match(regex))
                                regexMatch = true;
                        }
                        return [2 /*return*/, regexMatch];
                    case 2:
                        e_2 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.createDirectory = function (dirname) { return shelljs_1.default.mkdir('-p', dirname); };
        this.removeFiles = function (files) { return __awaiter(_this, void 0, void 0, function () {
            var _i, files_1, file, currentDirContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, files_1 = files;
                        _a.label = 1;
                    case 1:
                        if (!(_i < files_1.length)) return [3 /*break*/, 4];
                        file = files_1[_i];
                        return [4 /*yield*/, promises_1.readdir(process.cwd())];
                    case 2:
                        currentDirContent = _a.sent();
                        if (currentDirContent.includes(file)) {
                            shelljs_1.default.rm(file);
                        }
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.removeFilesFromRegexp = function (regexp) { return __awaiter(_this, void 0, void 0, function () {
            var currentDirContent, _i, currentDirContent_1, file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promises_1.readdir(process.cwd())];
                    case 1:
                        currentDirContent = _a.sent();
                        for (_i = 0, currentDirContent_1 = currentDirContent; _i < currentDirContent_1.length; _i++) {
                            file = currentDirContent_1[_i];
                            if (file.match(regexp)) {
                                shelljs_1.default.rm(file);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        }); };
    }
    return FsUtil;
}());
exports.fsUtil = new FsUtil();
