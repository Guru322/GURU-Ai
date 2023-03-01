export type PhoneNumberFormat =
	'e164' |
	'international' |
	'national' |
	'rfc3966' |
	'significant';

export type PhoneNumberTypes =
	'fixed-line' |
	'fixed-line-or-mobile' |
	'mobile' |
	'pager' |
	'personal-number' |
	'premium-rate' |
	'shared-cost' |
	'toll-free' |
	'uan' |
	'voip' |
	'unknown';


export class PhoneNumber
{
	/** @deprecated use `getPhoneNumber()` instead */
	constructor( phoneNumber: string, regionCode?: string );

	isValid( ): boolean;
	canBeInternationallyDialled( ): boolean;
	isPossible( ): boolean;
	getType( ): PhoneNumberTypes;
	isMobile( ): boolean;
	isFixedLine( ): boolean;
	getNumber( type?: PhoneNumberFormat ): string;
	getNumberFrom( regionCode: string ): string;
	getRegionCode( ): string;
	getCountryCode( ): number;
	toJSON( ): any;

	/**
	 * @deprecated Use the exported {@link getCountryCodeForRegionCode} function instead.
	 */
	static getCountryCodeForRegionCode( regionCode: string ): number;

	/**
	 * @deprecated Use the exported {@link getRegionCodeForCountryCode} function instead.
	 */
	static getRegionCodeForCountryCode( countryCode: number ): string;

	/**
	 * @deprecated Use the exported {@link getSupportedCallingCodes} function instead.
	 */
	static getSupportedCallingCodes( ): string[ ];

	/**
	 * @deprecated Use the exported {@link getSupportedRegionCodes} function instead.
	 */
	static getSupportedRegionCodes( ): string[ ];

	/**
	 * @deprecated Use the exported {@link getExample} function instead.
	 */
	static getExample( regionCode: string, type?: PhoneNumberTypes ): PhoneNumber;

	/**
	 * @deprecated Use the exported {@link getAsYouType} function instead.
	 */
	static getAsYouType( regionCode: string ): AsYouType;
}

/** @deprecated use `parsePhoneNumber()` instead */
export function PhoneNumber( phoneNumber: string, regionCode?: string ): PhoneNumber;

/**
 * Parse a phone number into a PhoneNumber class.
 *
 * @example
 *   // Using a national phone number format
 *   parsePhoneNumber( '0707123456', 'SE' )
 *   // Using an international (e164) phone number format
 *   parsePhoneNumber( '+46707123456' )
 *
 * @param phoneNumber Either an `e164` formatted (international) phone number
 *                    or a _national_ phone number.
 * @param regionCode  Region code for the phone number (only required if
 *                    {@link phoneNumber} is on a _national_ format).
 *                    Example: 'SE' for Sweden, 'CH' for Switzerland, etc.
 */
export function parsePhoneNumber( phoneNumber: string, regionCode?: string ): PhoneNumber;

export function getCountryCodeForRegionCode( regionCode: string ): number;
export function getRegionCodeForCountryCode( countryCode: number ): string;
export function getSupportedCallingCodes( ): string[ ];
export function getSupportedRegionCodes( ): string[ ];

/**
 * Get an example phone number, given a region code and a phone number
 * {@link PhoneNumberTypes type}.
 *
 * @param regionCode Region code
 * @param type Phone number {@link PhoneNumberTypes type}
 */
export function getExample( regionCode: string, type?: PhoneNumberTypes ): PhoneNumber;

/**
 * Get an instance of the AsYouType class, based on a region code.
 *
 * @param regionCode The region code to get an AsYouType instance for.
 */
export function getAsYouType( regionCode: string ): AsYouType;


export class AsYouType
{
	private constructor( );

	addChar( char: string ): string;
	number( ): string;
	removeChar( ): string;
	reset( number?: string ): string;
	getPhoneNumber( ): PhoneNumber;
}

/** @deprecated use `parsePhoneNumber()` instead */
export default PhoneNumber;
