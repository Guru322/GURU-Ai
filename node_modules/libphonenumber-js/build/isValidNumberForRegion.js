"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isValidNumberForRegion;

var _isViablePhoneNumber = _interopRequireDefault(require("./helpers/isViablePhoneNumber.js"));

var _parse_ = _interopRequireDefault(require("./parse_.js"));

var _isValidNumberForRegion_ = _interopRequireDefault(require("./isValidNumberForRegion_.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isValidNumberForRegion(number, country, metadata) {
  if (typeof number !== 'string') {
    throw new TypeError('number must be a string');
  }

  if (typeof country !== 'string') {
    throw new TypeError('country must be a string');
  } // `parse` extracts phone numbers from raw text,
  // therefore it will cut off all "garbage" characters,
  // while this `validate` function needs to verify
  // that the phone number contains no "garbage"
  // therefore the explicit `isViablePhoneNumber` check.


  var input;

  if ((0, _isViablePhoneNumber["default"])(number)) {
    input = (0, _parse_["default"])(number, {
      defaultCountry: country
    }, metadata);
  } else {
    input = {};
  }

  return (0, _isValidNumberForRegion_["default"])(input, country, undefined, metadata);
}
//# sourceMappingURL=isValidNumberForRegion.js.map