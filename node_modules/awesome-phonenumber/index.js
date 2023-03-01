const exportedName = 'PhoneNumber$$module$src$index';

module.exports =
	require( './lib' )[ exportedName ] ||
	(
		typeof globalThis !== 'undefined' && globalThis
		|| typeof global !== 'undefined' && global
		|| typeof window !== 'undefined' && window
		|| typeof self !== 'undefined' && self
		|| this
	)[ exportedName ];

Object.defineProperty(
	module.exports,
	"__esModule",
	{
		value: true
	}
);

module.exports.default = module.exports;

module.exports.parsePhoneNumber = module.exports;
module.exports.getCountryCodeForRegionCode = module.exports.getCountryCodeForRegionCode;
module.exports.getRegionCodeForCountryCode = module.exports.getRegionCodeForCountryCode;
module.exports.getSupportedCallingCodes = module.exports.getSupportedCallingCodes;
module.exports.getSupportedRegionCodes = module.exports.getSupportedRegionCodes;
module.exports.getExample = module.exports.getExample;
module.exports.getAsYouType = module.exports.getAsYouType;
