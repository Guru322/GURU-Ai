"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = findNumbers;

var _findNumbers_ = _interopRequireDefault(require("./findNumbers_.js"));

var _parsePhoneNumber = require("./parsePhoneNumber.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function findNumbers() {
  var _normalizeArguments = (0, _parsePhoneNumber.normalizeArguments)(arguments),
      text = _normalizeArguments.text,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  return (0, _findNumbers_["default"])(text, options, metadata);
}
//# sourceMappingURL=findNumbers.js.map