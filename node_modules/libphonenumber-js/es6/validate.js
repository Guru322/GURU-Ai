import _isValidNumber from './validate_.js';
import { normalizeArguments } from './getNumberType.js'; // Finds out national phone number type (fixed line, mobile, etc)

export default function isValidNumber() {
  var _normalizeArguments = normalizeArguments(arguments),
      input = _normalizeArguments.input,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  return _isValidNumber(input, options, metadata);
}
//# sourceMappingURL=validate.js.map