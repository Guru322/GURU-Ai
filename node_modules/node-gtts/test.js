var gtts = require('./index')('en', true);
var path = require('path');

/*
 * save audio file
 */

var filepath = path.join(__dirname, 'i-love-you.wav');
gtts.save(filepath, 'I love you', function() {
  console.log(`save file: "${filepath}" done`);
})

/*
 * Create server listen port 8668
 * API:
 *  + ?text=your-text //read text in defaut language
 *  + ?text=bonjour&lang=fr //read text in specific language (by each request)
 */
gtts.createServer(8668);
