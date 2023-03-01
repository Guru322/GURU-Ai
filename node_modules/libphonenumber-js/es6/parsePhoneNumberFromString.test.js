import _parsePhoneNumberFromString from './parsePhoneNumberFromString.js';
import metadata from '../metadata.min.json' assert { type: 'json' };

function parsePhoneNumberFromString() {
  for (var _len = arguments.length, parameters = new Array(_len), _key = 0; _key < _len; _key++) {
    parameters[_key] = arguments[_key];
  }

  parameters.push(metadata);
  return _parsePhoneNumberFromString.apply(this, parameters);
}

var USE_NON_GEOGRAPHIC_COUNTRY_CODE = false;
describe('parsePhoneNumberFromString', function () {
  it('should parse phone numbers from string', function () {
    parsePhoneNumberFromString('Phone: 8 (800) 555 35 35.', 'RU').nationalNumber.should.equal('8005553535');
    expect(parsePhoneNumberFromString('3', 'RU')).to.be.undefined;
  });
  it('should work in edge cases', function () {
    expect(parsePhoneNumberFromString('')).to.be.undefined;
  });
  it('should parse phone numbers when invalid country code is passed', function () {
    parsePhoneNumberFromString('Phone: +7 (800) 555 35 35.', 'XX').nationalNumber.should.equal('8005553535');
    expect(parsePhoneNumberFromString('Phone: 8 (800) 555-35-35.', 'XX')).to.be.undefined;
  });
  it('should parse non-geographic numbering plan phone numbers (extended)', function () {
    var phoneNumber = parsePhoneNumberFromString('+870773111632');
    phoneNumber.number.should.equal('+870773111632');

    if (USE_NON_GEOGRAPHIC_COUNTRY_CODE) {
      phoneNumber.country.should.equal('001');
    } else {
      expect(phoneNumber.country).to.be.undefined;
    }

    phoneNumber.countryCallingCode.should.equal('870');
  });
  it('should parse non-geographic numbering plan phone numbers (default country code) (extended)', function () {
    var phoneNumber = parsePhoneNumberFromString('773111632', {
      defaultCallingCode: '870'
    });
    phoneNumber.number.should.equal('+870773111632');

    if (USE_NON_GEOGRAPHIC_COUNTRY_CODE) {
      phoneNumber.country.should.equal('001');
    } else {
      expect(phoneNumber.country).to.be.undefined;
    }

    phoneNumber.countryCallingCode.should.equal('870');
  });
  it('should determine the possibility of non-geographic phone numbers', function () {
    var phoneNumber = parsePhoneNumberFromString('+870773111632');
    phoneNumber.isPossible().should.equal(true);
    var phoneNumber2 = parsePhoneNumberFromString('+8707731116321');
    phoneNumber2.isPossible().should.equal(false);
  });
  it('should support `extract: false` flag', function () {
    var testCorrectness = function testCorrectness(number, expectedResult) {
      var result = expect(parsePhoneNumberFromString(number, {
        extract: false,
        defaultCountry: 'US'
      }));

      if (expectedResult) {
        result.to.not.be.undefined;
      } else {
        result.to.be.undefined;
      }
    };

    testCorrectness('Call: (213) 373-4253', false);
    testCorrectness('(213) 373-4253x', false);
    testCorrectness('(213) 373-4253', true);
    testCorrectness('- (213) 373-4253 -', true);
    testCorrectness('+1 (213) 373-4253', true);
    testCorrectness(' +1 (213) 373-4253', false);
  });
  it('should not prematurely strip a possible national prefix from Chinese numbers', function () {
    // https://gitlab.com/catamphetamine/libphonenumber-js/-/issues/57
    var phoneNumber = parsePhoneNumberFromString('+86123456789');
    phoneNumber.isPossible().should.equal(true);
    phoneNumber.isValid().should.equal(false);
    phoneNumber.nationalNumber.should.equal('123456789');
  });
});
//# sourceMappingURL=parsePhoneNumberFromString.test.js.map