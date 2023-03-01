"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ipRegex = require('ip-regex');

var tlds = require('tlds');
/* istanbul ignore next */


var SafeRegExp = function () {
  try {
    var RE2 = require('re2');

    return typeof RE2 === 'function' ? RE2 : RegExp;
  } catch (_unused) {
    return RegExp;
  }
}();

var ipv4 = ipRegex.v4().source;
var ipv6 = ipRegex.v6().source;

module.exports = function (options) {
  options = _objectSpread({
    exact: false,
    strict: false,
    auth: false,
    localhost: true,
    parens: false,
    apostrophes: false,
    trailingPeriod: false,
    ipv4: true,
    ipv6: true,
    tlds: tlds,
    returnString: false
  }, options);
  var protocol = "(?:(?:[a-z]+:)?//)".concat(options.strict ? '' : '?'); // Add option to disable matching urls with HTTP Basic Authentication
  // <https://github.com/kevva/url-regex/pull/63>

  var auth = options.auth ? '(?:\\S+(?::\\S*)?@)?' : '';
  var host = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)";
  var domain = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*"; // Add ability to pass custom list of tlds
  // <https://github.com/kevva/url-regex/pull/66>

  var tld = "(?:\\.".concat(options.strict ? "(?:[a-z\\u00a1-\\uffff]{2,})" : "(?:".concat(options.tlds.sort(function (a, b) {
    return b.length - a.length;
  }).join('|'), ")"), ")").concat(options.trailingPeriod ? '\\.?' : '');
  var port = '(?::\\d{2,5})?'; // Not accept closing parenthesis
  // <https://github.com/kevva/url-regex/pull/35>
  // Don't allow apostrophes
  // <https://github.com/kevva/url-regex/pull/55>

  var path = options.parens ? options.apostrophes ? '(?:[/?#][^\\s"]*)?' : '(?:[/?#][^\\s"\']*)?' : options.apostrophes ? '(?:[/?#][^\\s"\\)]*)?' : '(?:[/?#][^\\s"\\)\']*)?'; // Added IPv6 support
  // <https://github.com/kevva/url-regex/issues/60>

  var regex = "(?:".concat(protocol, "|www\\.)").concat(auth, "(?:");
  if (options.localhost) regex += 'localhost|';
  if (options.ipv4) regex += "".concat(ipv4, "|");
  if (options.ipv6) regex += "".concat(ipv6, "|");
  regex += "".concat(host).concat(domain).concat(tld, ")").concat(port).concat(path); // Add option to return the regex string instead of a RegExp

  if (options.returnString) return regex;
  return options.exact ? new SafeRegExp("(?:^".concat(regex, "$)"), 'i') : new SafeRegExp(regex, 'ig');
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJpcFJlZ2V4IiwicmVxdWlyZSIsInRsZHMiLCJTYWZlUmVnRXhwIiwiUkUyIiwiUmVnRXhwIiwiaXB2NCIsInY0Iiwic291cmNlIiwiaXB2NiIsInY2IiwibW9kdWxlIiwiZXhwb3J0cyIsIm9wdGlvbnMiLCJleGFjdCIsInN0cmljdCIsImF1dGgiLCJsb2NhbGhvc3QiLCJwYXJlbnMiLCJhcG9zdHJvcGhlcyIsInRyYWlsaW5nUGVyaW9kIiwicmV0dXJuU3RyaW5nIiwicHJvdG9jb2wiLCJob3N0IiwiZG9tYWluIiwidGxkIiwic29ydCIsImEiLCJiIiwibGVuZ3RoIiwiam9pbiIsInBvcnQiLCJwYXRoIiwicmVnZXgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsSUFBTUEsT0FBTyxHQUFHQyxPQUFPLENBQUMsVUFBRCxDQUF2Qjs7QUFDQSxJQUFNQyxJQUFJLEdBQUdELE9BQU8sQ0FBQyxNQUFELENBQXBCO0FBRUE7OztBQUNBLElBQU1FLFVBQVUsR0FBSSxZQUFNO0FBQ3hCLE1BQUk7QUFDRixRQUFNQyxHQUFHLEdBQUdILE9BQU8sQ0FBQyxLQUFELENBQW5COztBQUNBLFdBQU8sT0FBT0csR0FBUCxLQUFlLFVBQWYsR0FBNEJBLEdBQTVCLEdBQWtDQyxNQUF6QztBQUNELEdBSEQsQ0FHRSxnQkFBTTtBQUNOLFdBQU9BLE1BQVA7QUFDRDtBQUNGLENBUGtCLEVBQW5COztBQVFBLElBQU1DLElBQUksR0FBR04sT0FBTyxDQUFDTyxFQUFSLEdBQWFDLE1BQTFCO0FBQ0EsSUFBTUMsSUFBSSxHQUFHVCxPQUFPLENBQUNVLEVBQVIsR0FBYUYsTUFBMUI7O0FBRUFHLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQixVQUFDQyxPQUFELEVBQWE7QUFDNUJBLEVBQUFBLE9BQU87QUFDTEMsSUFBQUEsS0FBSyxFQUFFLEtBREY7QUFFTEMsSUFBQUEsTUFBTSxFQUFFLEtBRkg7QUFHTEMsSUFBQUEsSUFBSSxFQUFFLEtBSEQ7QUFJTEMsSUFBQUEsU0FBUyxFQUFFLElBSk47QUFLTEMsSUFBQUEsTUFBTSxFQUFFLEtBTEg7QUFNTEMsSUFBQUEsV0FBVyxFQUFFLEtBTlI7QUFPTEMsSUFBQUEsY0FBYyxFQUFFLEtBUFg7QUFRTGQsSUFBQUEsSUFBSSxFQUFFLElBUkQ7QUFTTEcsSUFBQUEsSUFBSSxFQUFFLElBVEQ7QUFVTFAsSUFBQUEsSUFBSSxFQUFKQSxJQVZLO0FBV0xtQixJQUFBQSxZQUFZLEVBQUU7QUFYVCxLQVlGUixPQVpFLENBQVA7QUFlQSxNQUFNUyxRQUFRLCtCQUF3QlQsT0FBTyxDQUFDRSxNQUFSLEdBQWlCLEVBQWpCLEdBQXNCLEdBQTlDLENBQWQsQ0FoQjRCLENBaUI1QjtBQUNBOztBQUNBLE1BQU1DLElBQUksR0FBR0gsT0FBTyxDQUFDRyxJQUFSLEdBQWUsc0JBQWYsR0FBd0MsRUFBckQ7QUFDQSxNQUFNTyxJQUFJLEdBQUcsK0RBQWI7QUFDQSxNQUFNQyxNQUFNLEdBQ1YsZ0VBREYsQ0FyQjRCLENBdUI1QjtBQUNBOztBQUNBLE1BQU1DLEdBQUcsbUJBQ1BaLE9BQU8sQ0FBQ0UsTUFBUixHQUNJLDhCQURKLGdCQUVVRixPQUFPLENBQUNYLElBQVIsQ0FBYXdCLElBQWIsQ0FBa0IsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsV0FBVUEsQ0FBQyxDQUFDQyxNQUFGLEdBQVdGLENBQUMsQ0FBQ0UsTUFBdkI7QUFBQSxHQUFsQixFQUFpREMsSUFBakQsQ0FBc0QsR0FBdEQsQ0FGVixNQURPLGNBSUxqQixPQUFPLENBQUNPLGNBQVIsR0FBeUIsTUFBekIsR0FBa0MsRUFKN0IsQ0FBVDtBQU1BLE1BQU1XLElBQUksR0FBRyxnQkFBYixDQS9CNEIsQ0FnQzVCO0FBQ0E7QUFDQTtBQUNBOztBQUNBLE1BQU1DLElBQUksR0FBR25CLE9BQU8sQ0FBQ0ssTUFBUixHQUNUTCxPQUFPLENBQUNNLFdBQVIsR0FDRSxvQkFERixHQUVFLHNCQUhPLEdBSVROLE9BQU8sQ0FBQ00sV0FBUixHQUNBLHVCQURBLEdBRUEseUJBTkosQ0FwQzRCLENBNEM1QjtBQUNBOztBQUNBLE1BQUljLEtBQUssZ0JBQVNYLFFBQVQscUJBQTRCTixJQUE1QixRQUFUO0FBQ0EsTUFBSUgsT0FBTyxDQUFDSSxTQUFaLEVBQXVCZ0IsS0FBSyxJQUFJLFlBQVQ7QUFDdkIsTUFBSXBCLE9BQU8sQ0FBQ1AsSUFBWixFQUFrQjJCLEtBQUssY0FBTzNCLElBQVAsTUFBTDtBQUNsQixNQUFJTyxPQUFPLENBQUNKLElBQVosRUFBa0J3QixLQUFLLGNBQU94QixJQUFQLE1BQUw7QUFDbEJ3QixFQUFBQSxLQUFLLGNBQU9WLElBQVAsU0FBY0MsTUFBZCxTQUF1QkMsR0FBdkIsY0FBOEJNLElBQTlCLFNBQXFDQyxJQUFyQyxDQUFMLENBbEQ0QixDQW9ENUI7O0FBQ0EsTUFBSW5CLE9BQU8sQ0FBQ1EsWUFBWixFQUEwQixPQUFPWSxLQUFQO0FBRTFCLFNBQU9wQixPQUFPLENBQUNDLEtBQVIsR0FDSCxJQUFJWCxVQUFKLGVBQXNCOEIsS0FBdEIsU0FBaUMsR0FBakMsQ0FERyxHQUVILElBQUk5QixVQUFKLENBQWU4QixLQUFmLEVBQXNCLElBQXRCLENBRko7QUFHRCxDQTFERCIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGlwUmVnZXggPSByZXF1aXJlKCdpcC1yZWdleCcpO1xuY29uc3QgdGxkcyA9IHJlcXVpcmUoJ3RsZHMnKTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmNvbnN0IFNhZmVSZWdFeHAgPSAoKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IFJFMiA9IHJlcXVpcmUoJ3JlMicpO1xuICAgIHJldHVybiB0eXBlb2YgUkUyID09PSAnZnVuY3Rpb24nID8gUkUyIDogUmVnRXhwO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gUmVnRXhwO1xuICB9XG59KSgpO1xuY29uc3QgaXB2NCA9IGlwUmVnZXgudjQoKS5zb3VyY2U7XG5jb25zdCBpcHY2ID0gaXBSZWdleC52NigpLnNvdXJjZTtcblxubW9kdWxlLmV4cG9ydHMgPSAob3B0aW9ucykgPT4ge1xuICBvcHRpb25zID0ge1xuICAgIGV4YWN0OiBmYWxzZSxcbiAgICBzdHJpY3Q6IGZhbHNlLFxuICAgIGF1dGg6IGZhbHNlLFxuICAgIGxvY2FsaG9zdDogdHJ1ZSxcbiAgICBwYXJlbnM6IGZhbHNlLFxuICAgIGFwb3N0cm9waGVzOiBmYWxzZSxcbiAgICB0cmFpbGluZ1BlcmlvZDogZmFsc2UsXG4gICAgaXB2NDogdHJ1ZSxcbiAgICBpcHY2OiB0cnVlLFxuICAgIHRsZHMsXG4gICAgcmV0dXJuU3RyaW5nOiBmYWxzZSxcbiAgICAuLi5vcHRpb25zXG4gIH07XG5cbiAgY29uc3QgcHJvdG9jb2wgPSBgKD86KD86W2Etel0rOik/Ly8pJHtvcHRpb25zLnN0cmljdCA/ICcnIDogJz8nfWA7XG4gIC8vIEFkZCBvcHRpb24gdG8gZGlzYWJsZSBtYXRjaGluZyB1cmxzIHdpdGggSFRUUCBCYXNpYyBBdXRoZW50aWNhdGlvblxuICAvLyA8aHR0cHM6Ly9naXRodWIuY29tL2tldnZhL3VybC1yZWdleC9wdWxsLzYzPlxuICBjb25zdCBhdXRoID0gb3B0aW9ucy5hdXRoID8gJyg/OlxcXFxTKyg/OjpcXFxcUyopP0ApPycgOiAnJztcbiAgY29uc3QgaG9zdCA9ICcoPzooPzpbYS16XFxcXHUwMGExLVxcXFx1ZmZmZjAtOV1bLV9dKikqW2EtelxcXFx1MDBhMS1cXFxcdWZmZmYwLTldKyknO1xuICBjb25zdCBkb21haW4gPVxuICAgICcoPzpcXFxcLig/OlthLXpcXFxcdTAwYTEtXFxcXHVmZmZmMC05XS0qKSpbYS16XFxcXHUwMGExLVxcXFx1ZmZmZjAtOV0rKSonO1xuICAvLyBBZGQgYWJpbGl0eSB0byBwYXNzIGN1c3RvbSBsaXN0IG9mIHRsZHNcbiAgLy8gPGh0dHBzOi8vZ2l0aHViLmNvbS9rZXZ2YS91cmwtcmVnZXgvcHVsbC82Nj5cbiAgY29uc3QgdGxkID0gYCg/OlxcXFwuJHtcbiAgICBvcHRpb25zLnN0cmljdFxuICAgICAgPyAnKD86W2EtelxcXFx1MDBhMS1cXFxcdWZmZmZdezIsfSknXG4gICAgICA6IGAoPzoke29wdGlvbnMudGxkcy5zb3J0KChhLCBiKSA9PiBiLmxlbmd0aCAtIGEubGVuZ3RoKS5qb2luKCd8Jyl9KWBcbiAgfSkke29wdGlvbnMudHJhaWxpbmdQZXJpb2QgPyAnXFxcXC4/JyA6ICcnfWA7XG5cbiAgY29uc3QgcG9ydCA9ICcoPzo6XFxcXGR7Miw1fSk/JztcbiAgLy8gTm90IGFjY2VwdCBjbG9zaW5nIHBhcmVudGhlc2lzXG4gIC8vIDxodHRwczovL2dpdGh1Yi5jb20va2V2dmEvdXJsLXJlZ2V4L3B1bGwvMzU+XG4gIC8vIERvbid0IGFsbG93IGFwb3N0cm9waGVzXG4gIC8vIDxodHRwczovL2dpdGh1Yi5jb20va2V2dmEvdXJsLXJlZ2V4L3B1bGwvNTU+XG4gIGNvbnN0IHBhdGggPSBvcHRpb25zLnBhcmVuc1xuICAgID8gb3B0aW9ucy5hcG9zdHJvcGhlc1xuICAgICAgPyAnKD86Wy8/I11bXlxcXFxzXCJdKik/J1xuICAgICAgOiAnKD86Wy8/I11bXlxcXFxzXCJcXCddKik/J1xuICAgIDogb3B0aW9ucy5hcG9zdHJvcGhlc1xuICAgID8gJyg/OlsvPyNdW15cXFxcc1wiXFxcXCldKik/J1xuICAgIDogJyg/OlsvPyNdW15cXFxcc1wiXFxcXClcXCddKik/JztcblxuICAvLyBBZGRlZCBJUHY2IHN1cHBvcnRcbiAgLy8gPGh0dHBzOi8vZ2l0aHViLmNvbS9rZXZ2YS91cmwtcmVnZXgvaXNzdWVzLzYwPlxuICBsZXQgcmVnZXggPSBgKD86JHtwcm90b2NvbH18d3d3XFxcXC4pJHthdXRofSg/OmA7XG4gIGlmIChvcHRpb25zLmxvY2FsaG9zdCkgcmVnZXggKz0gJ2xvY2FsaG9zdHwnO1xuICBpZiAob3B0aW9ucy5pcHY0KSByZWdleCArPSBgJHtpcHY0fXxgO1xuICBpZiAob3B0aW9ucy5pcHY2KSByZWdleCArPSBgJHtpcHY2fXxgO1xuICByZWdleCArPSBgJHtob3N0fSR7ZG9tYWlufSR7dGxkfSkke3BvcnR9JHtwYXRofWA7XG5cbiAgLy8gQWRkIG9wdGlvbiB0byByZXR1cm4gdGhlIHJlZ2V4IHN0cmluZyBpbnN0ZWFkIG9mIGEgUmVnRXhwXG4gIGlmIChvcHRpb25zLnJldHVyblN0cmluZykgcmV0dXJuIHJlZ2V4O1xuXG4gIHJldHVybiBvcHRpb25zLmV4YWN0XG4gICAgPyBuZXcgU2FmZVJlZ0V4cChgKD86XiR7cmVnZXh9JClgLCAnaScpXG4gICAgOiBuZXcgU2FmZVJlZ0V4cChyZWdleCwgJ2lnJyk7XG59O1xuIl19