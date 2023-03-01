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
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveToScope = exports.tryGetFromScope = void 0;
const inversify_1 = require("../inversify");
const async_1 = require("../utils/async");
const tryGetFromScope = (requestScope, binding) => {
    if ((binding.scope === inversify_1.BindingScopeEnum.Singleton) && binding.activated) {
        return binding.cache;
    }
    if (binding.scope === inversify_1.BindingScopeEnum.Request &&
        requestScope.has(binding.id)) {
        return requestScope.get(binding.id);
    }
    return null;
};
exports.tryGetFromScope = tryGetFromScope;
const saveToScope = (requestScope, binding, result) => {
    if (binding.scope === inversify_1.BindingScopeEnum.Singleton) {
        _saveToSingletonScope(binding, result);
    }
    if (binding.scope === inversify_1.BindingScopeEnum.Request) {
        _saveToRequestScope(requestScope, binding, result);
    }
};
exports.saveToScope = saveToScope;
const _saveToRequestScope = (requestScope, binding, result) => {
    if (!requestScope.has(binding.id)) {
        requestScope.set(binding.id, result);
    }
};
const _saveToSingletonScope = (binding, result) => {
    binding.cache = result;
    binding.activated = true;
    if ((0, async_1.isPromise)(result)) {
        void _saveAsyncResultToSingletonScope(binding, result);
    }
};
const _saveAsyncResultToSingletonScope = (binding, asyncResult) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield asyncResult;
        binding.cache = result;
    }
    catch (ex) {
        binding.cache = null;
        binding.activated = false;
        throw ex;
    }
});
//# sourceMappingURL=scope.js.map