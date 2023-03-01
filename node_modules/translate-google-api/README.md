# translate-google-api
A free and unlimited API for Google Translate（support single text and Multi-segment text） 💵🚫
# Feature

- Multi-segment text support
- Auto language detection
- Language correction
- Fast and reliable – it uses the same servers that [translate.google.com](https://translate.google.com/) uses
- Free and unlimited (translate.google.com uses a token to authorize the requests. If you are not Google, you do not have this token and will have to pay [$20 per 1 million characters of text](https://cloud.google.com/translate/v2/pricing))
- Supports: ReactJs, React-Native, NodeJs ...

# Install

```shell
npm install --save translate-google-api
```

# Why this repo ？

I have tried some libs for translate on React-Native app. But don't have any package support.

I don't want to translate all the text first and I'd like to translate segment by segment. Especially in an article, the whole translation may not work well.

In the existing library, if I want to translate multi-segment text, I have to request multiple times.(like [google-translate-api](https://github.com/matheuss/google-translate-api))

So I have to use the new api to implement, so the `translate-google-api` is born.

# Usage

Single segment
```javascript
import translate from 'translate-google-api';
const result = await translate(`I'm fine.`, {
  tld: "cn",
  to: "vi",
});
// ["Tôi ổn."]


```

Multi-segment text
```javascript
import translate from 'translate-google-api';

const result = await translate(['Hi', 'How are you?', `I'm fine`], {
  tld: "cn",
  to: "vi",
});
//["Chào","Bạn khỏe không?","Tôi ổn."]

```

Proxy

proxy-config [https://github.com/axios/axios#request-config](https://github.com/axios/axios#request-config)
```javascript
const result = await translate([`I'm fine. And you?`,`I'm ok.`], {
  tld: "cn",
  to: "vi",
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  }
});
```

# API

## translate(text, options)

### text

Type: `string`, `array`

The text to be translated

### options

Type: object

**from？**
Type: `string` Default: auto

The text language. Must be auto or one of the codes/names (not case sensitive) contained in src/languages.ts

**to**
Type: `string` Default: en

The language in which the text should be translated. Must be one of the codes/names (not case sensitive) contained in src/languages.ts.

**tld**
Type: `string` 'com' | 'cn' <Default 'com'>

`cn` is for China, `com` for others.

**proxy**
Type: `AxiosProxyConfig`

proxy for request.

**config**
Type: `object`

config for [axios](https://github.com/axios/axios)

# Related
- [vitalets/google-translate-token](https://github.com/vitalets/google-translate-token)
- [google-translate-api](https://github.com/matheuss/google-translate-api)
- [translate-md-viewer](https://github.com/hua1995116/translate-md-viewer)

# Inspiration

# License

Apache License