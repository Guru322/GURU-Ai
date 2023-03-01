# Fake User-Agent for nodejs

Just another package for generate a fake userAgent to bypass some guys

## How to install
```bash
npm install fake-useragent
```

## How to use
```javascript
const fakeUa = require('fake-useragent');
console.log(fakeUa());
```

## In the real world ^o^

```javascript
const fakeUa = require('fake-useragent');
const request = require('request');

var url = 'https://www.google.com.vn/search?safe=off&hl=en&q=hello';
var headers = {
  'User-Agent': fakeUa()
};
request.get({ url: url, headers: headers }, function (e, r, body) {
  console.log(r, body)
});

```
