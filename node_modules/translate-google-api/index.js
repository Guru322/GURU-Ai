
var translate_1 = require("./src/translate");

function translate(value, options) {
  var text;
  if (typeof value === 'string') {
    text = [value];
  }
  else {
    text = value;
  }
  return translate_1.default(text, options);
}

module.exports = translate;