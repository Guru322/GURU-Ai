"use strict";

var _findPhoneNumbersInText = _interopRequireDefault(require("./findPhoneNumbersInText.js"));

var _metadataMin = _interopRequireDefault(require("../metadata.min.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('findPhoneNumbersInText', function () {
  it('should find phone numbers in text (with default country)', function () {
    (0, _findPhoneNumbersInText["default"])('+7 (800) 555-35-35', 'US', _metadataMin["default"])[0].number.number.should.equal('+78005553535');
  });
  it('should find phone numbers in text (with default country in options)', function () {
    (0, _findPhoneNumbersInText["default"])('+7 (800) 555-35-35', {
      defaultCountry: 'US'
    }, _metadataMin["default"])[0].number.number.should.equal('+78005553535');
  });
  it('should find phone numbers in text (with default country and options)', function () {
    (0, _findPhoneNumbersInText["default"])('+7 (800) 555-35-35', 'US', {}, _metadataMin["default"])[0].number.number.should.equal('+78005553535');
  });
  it('should find phone numbers in text (without default country, with options)', function () {
    (0, _findPhoneNumbersInText["default"])('+7 (800) 555-35-35', undefined, {}, _metadataMin["default"])[0].number.number.should.equal('+78005553535');
  });
  it('should find phone numbers in text (with default country, without options)', function () {
    (0, _findPhoneNumbersInText["default"])('+7 (800) 555-35-35', 'US', undefined, _metadataMin["default"])[0].number.number.should.equal('+78005553535');
  });
  it('should find phone numbers in text (with empty default country)', function () {
    (0, _findPhoneNumbersInText["default"])('+7 (800) 555-35-35', undefined, _metadataMin["default"])[0].number.number.should.equal('+78005553535');
  });
  it('should find phone numbers in text', function () {
    var NUMBERS = ['+78005553535', '+12133734253'];
    var results = (0, _findPhoneNumbersInText["default"])('The number is +7 (800) 555-35-35 and not (213) 373-4253 as written in the document.', _metadataMin["default"]);
    var i = 0;

    while (i < results.length) {
      results[i].number.number.should.equal(NUMBERS[i]);
      i++;
    }
  });
  it('should find phone numbers in text (default country calling code)', function () {
    var NUMBERS = ['+870773111632'];
    var results = (0, _findPhoneNumbersInText["default"])('The number is 773 111 632', {
      defaultCallingCode: '870'
    }, _metadataMin["default"]);
    var i = 0;

    while (i < results.length) {
      results[i].number.number.should.equal(NUMBERS[i]);
      i++;
    }
  });
});
//# sourceMappingURL=findPhoneNumbersInText.test.js.map