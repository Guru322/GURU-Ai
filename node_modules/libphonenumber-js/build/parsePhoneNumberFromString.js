"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parsePhoneNumberFromString;

var _parsePhoneNumber = require("./parsePhoneNumber.js");

var _parsePhoneNumberFromString_ = _interopRequireDefault(require("./parsePhoneNumberFromString_.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function parsePhoneNumberFromString() {
  var _normalizeArguments = (0, _parsePhoneNumber.normalizeArguments)(arguments),
      text = _normalizeArguments.text,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  return (0, _parsePhoneNumberFromString_["default"])(text, options, metadata);
}
//# sourceMappingURL=parsePhoneNumberFromString.js.map