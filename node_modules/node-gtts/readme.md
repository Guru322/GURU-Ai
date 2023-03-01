# node-gtts
Google Text-to-Speech for NodeJS (Unofficial API)

## How to install
```bash
npm install node-gtts
```

## How to use

### 1. Save audio file
```javascript
var gtts = require('node-gtts')('en');
var path = require('path');
var filepath = path.join(__dirname, 'i-love-you.wav');

gtts.save(filepath, 'I love you', function() {
  console.log('save done');
})
```

### 2. Pipe directly to router response
Example with ExpressJS Router

```javascript
var express = require('express');
var router = express.Router();
var gtts = require('node-gtts')('en');

router.get('/speech', function(req, res) {
  res.set({'Content-Type': 'audio/mpeg'});
  gtts.stream(req.query.text).pipe(res);
})
```

### 3. Create a standalone server
```javascript
var gtts = require('node-gtts')('en');
gtts.createServer(8668);
```

### 4. Command line usage
```bash
# create file: helllo-world.wav
node-gtts en Hello World

# create server listen port 8668
# (in English by default)
node-gtts serve 8668 en
```


## API for standalone server
`GET /?text={your-text}`
+ stream audio of speech with default language

`GET /?text={your-text}?lang={lang}`
+ stream audio of speech with specific language
