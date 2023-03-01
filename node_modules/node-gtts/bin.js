#!/usr/bin/env node

const gtts = require('./index');
const args = process.argv.splice(2);
const path = require('path');

if (args[0] == 'serve' || args[0] == 'server') {
  var port = parseInt(args[1]) || 8668;
  var lang = args[2];
  gtts(lang).createServer(port);
} else {
  var lang = args[0];
  var text_parts = args.splice(1);
  var text = text_parts.join(' ');
  var filename = text.replace(/' '/g, '-') + '.wav';
  var filepath = path.join(__dirname, filename);

  gtts(lang).save(filepath, text, function() {
    console.log(`${filepath} was saved!`)
  });
}
