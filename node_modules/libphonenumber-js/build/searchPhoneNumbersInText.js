"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = searchPhoneNumbersInText;

var _searchNumbers = _interopRequireDefault(require("./searchNumbers.js"));

var _findPhoneNumbersInText = require("./findPhoneNumbersInText.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function searchPhoneNumbersInText(text, defaultCountry, options, metadata) {
  var args = (0, _findPhoneNumbersInText.getArguments)(defaultCountry, options, metadata);
  return (0, _searchNumbers["default"])(text, args.options, args.metadata);
}
//# sourceMappingURL=searchPhoneNumbersInText.js.map