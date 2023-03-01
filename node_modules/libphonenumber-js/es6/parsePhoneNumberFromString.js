import { normalizeArguments } from './parsePhoneNumber.js';
import parsePhoneNumberFromString_ from './parsePhoneNumberFromString_.js';
export default function parsePhoneNumberFromString() {
  var _normalizeArguments = normalizeArguments(arguments),
      text = _normalizeArguments.text,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  return parsePhoneNumberFromString_(text, options, metadata);
}
//# sourceMappingURL=parsePhoneNumberFromString.js.map