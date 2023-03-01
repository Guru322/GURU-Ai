"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manga = exports.Character = exports.Anime = void 0;
var lib_1 = require("./lib");
Object.defineProperty(exports, "Anime", { enumerable: true, get: function () { return lib_1.Anime; } });
Object.defineProperty(exports, "Character", { enumerable: true, get: function () { return lib_1.Character; } });
Object.defineProperty(exports, "Manga", { enumerable: true, get: function () { return lib_1.Manga; } });
__exportStar(require("./typings"), exports);
