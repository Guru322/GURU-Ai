var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
define(["require", "exports", "../constants/metadata_keys", "../utils/id", "../utils/serialization", "./metadata", "./queryable_string"], function (require, exports, METADATA_KEY, id_1, serialization_1, metadata_1, queryable_string_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Target = void 0;
    METADATA_KEY = __importStar(METADATA_KEY);
    var Target = (function () {
        function Target(type, identifier, serviceIdentifier, namedOrTagged) {
            this.id = (0, id_1.id)();
            this.type = type;
            this.serviceIdentifier = serviceIdentifier;
            var queryableName = typeof identifier === 'symbol' ? (0, serialization_1.getSymbolDescription)(identifier) : identifier;
            this.name = new queryable_string_1.QueryableString(queryableName || "");
            this.identifier = identifier;
            this.metadata = new Array();
            var metadataItem = null;
            if (typeof namedOrTagged === 'string') {
                metadataItem = new metadata_1.Metadata(METADATA_KEY.NAMED_TAG, namedOrTagged);
            }
            else if (namedOrTagged instanceof metadata_1.Metadata) {
                metadataItem = namedOrTagged;
            }
            if (metadataItem !== null) {
                this.metadata.push(metadataItem);
            }
        }
        Target.prototype.hasTag = function (key) {
            for (var _i = 0, _a = this.metadata; _i < _a.length; _i++) {
                var m = _a[_i];
                if (m.key === key) {
                    return true;
                }
            }
            return false;
        };
        Target.prototype.isArray = function () {
            return this.hasTag(METADATA_KEY.MULTI_INJECT_TAG);
        };
        Target.prototype.matchesArray = function (name) {
            return this.matchesTag(METADATA_KEY.MULTI_INJECT_TAG)(name);
        };
        Target.prototype.isNamed = function () {
            return this.hasTag(METADATA_KEY.NAMED_TAG);
        };
        Target.prototype.isTagged = function () {
            return this.metadata.some(function (metadata) { return METADATA_KEY.NON_CUSTOM_TAG_KEYS.every(function (key) { return metadata.key !== key; }); });
        };
        Target.prototype.isOptional = function () {
            return this.matchesTag(METADATA_KEY.OPTIONAL_TAG)(true);
        };
        Target.prototype.getNamedTag = function () {
            if (this.isNamed()) {
                return this.metadata.filter(function (m) { return m.key === METADATA_KEY.NAMED_TAG; })[0];
            }
            return null;
        };
        Target.prototype.getCustomTags = function () {
            if (this.isTagged()) {
                return this.metadata.filter(function (metadata) { return METADATA_KEY.NON_CUSTOM_TAG_KEYS.every(function (key) { return metadata.key !== key; }); });
            }
            else {
                return null;
            }
        };
        Target.prototype.matchesNamedTag = function (name) {
            return this.matchesTag(METADATA_KEY.NAMED_TAG)(name);
        };
        Target.prototype.matchesTag = function (key) {
            var _this = this;
            return function (value) {
                for (var _i = 0, _a = _this.metadata; _i < _a.length; _i++) {
                    var m = _a[_i];
                    if (m.key === key && m.value === value) {
                        return true;
                    }
                }
                return false;
            };
        };
        return Target;
    }());
    exports.Target = Target;
});
//# sourceMappingURL=target.js.map