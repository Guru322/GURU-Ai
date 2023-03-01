import _findNumbers from './findNumbers_.js';
import { normalizeArguments } from './parsePhoneNumber.js';
export default function findNumbers() {
  var _normalizeArguments = normalizeArguments(arguments),
      text = _normalizeArguments.text,
      options = _normalizeArguments.options,
      metadata = _normalizeArguments.metadata;

  return _findNumbers(text, options, metadata);
}
//# sourceMappingURL=findNumbers.js.map