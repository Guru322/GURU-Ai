import PhoneNumberMatcher from './PhoneNumberMatcher.js';
export default function findNumbers(text, options, metadata) {
  var matcher = new PhoneNumberMatcher(text, options, metadata);
  var results = [];

  while (matcher.hasNext()) {
    results.push(matcher.next());
  }

  return results;
}
//# sourceMappingURL=findNumbers_.js.map