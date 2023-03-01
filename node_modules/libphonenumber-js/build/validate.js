"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isValidNumber;

var _validate_ = _interopRequireDefault(require("./validate_.js"));

var _getNumberType = require("./getNumberType.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Finds out national phone number type (fixed line, mobile, etc)
function isValidNumber() {
  var _normalizeArguments = (0, _getNumberType.normalizeArguments)(arguments),
      input = _normalizeArguments.input,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  return (0, _validate_["default"])(input, options, metadata);
}
//# sourceMappingURL=validate.js.map