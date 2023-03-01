# EmojiAPI
Simple Emoji API.

# Installing

```sh
$ npm i emoji-api
```

# Example

```js
const { EmojiAPI } = require("emoji-api");
const emoji = new EmojiAPI();

emoji.get("🥺")
    .then(emoji => {
        console.log(emoji);
    })

/* Response */
Emoji {
  emoji: '🥺',
  unicode: 'U+1F97A',
  name: 'Pleading Face',
  description: 'A yellow face with furrowed eyebrows, a small frown, and large, “puppy dog” eyes, as if begging or pleading. May also represent adoration or feeling touched by a loving gesture.',  
  images: [
    {
      index: 0,
      vendor: 'Apple',
      url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/285/pleading-face_1f97a.png'
    },
    {
      index: 1,
      vendor: 'Google',
      url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/298/pleading-face_1f97a.png'
    },
    {
      index: 2,
      vendor: 'Samsung',
      url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/samsung/306/pleading-face_1f97a.png'
    },
    {
      index: 3,
      vendor: 'Microsoft',
      url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/face-with-pleading-eyes_1f97a.png'
    },
    {
      index: 4,
      vendor: 'WhatsApp',
      url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/whatsapp/302/pleading-face_1f97a.png'
    },
    {
      index: 5,
      vendor: 'Twitter',
      url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/282/pleading-face_1f97a.png'
    },
    {
      index: 6,
      vendor: 'Facebook',
      url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/facebook/304/pleading-face_1f97a.png'
    },
    {
      index: 7,
      vendor: 'Skype',
      url: 'https://emojipedia-us.s3.amazonaws.com/source/skype/289/pleading-face_1f97a.png'
    },
    {
      index: 8,
      vendor: 'JoyPixels',
      url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/joypixels/291/pleading-face_1f97a.png'
    },
    {
      index: 9,
      vendor: 'OpenMoji',
      url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/openmoji/292/pleading-face_1f97a.png'
    },
    {
      index: 10,
      vendor: 'Emojipedia',
      url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/emojipedia/132/face-with-pleading-eyes_1f97a.png'
    },
    {
      index: 11,
      vendor: 'LG',
      url: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/lg/307/pleading-face_1f97a.png'
    }
  ],
  shortCodes: [ ':pleading_face:' ]
}
```

# Other Examples

```js
console.log(emoji.EmojiToUnicode("🥺")); // 1f97a
console.log(emoji.UnicodeToEmoji("1f97a")); // 🥺
```