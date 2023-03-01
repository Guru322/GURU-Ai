var axios = require('axios');

var translateToken = require("./token");
var language_1 = require("./language");
var util_1 = require("./util");

function translate(data, options) {
  var e;
  options.from = options.from || 'auto';
  options.to = options.to || 'en';
  if (options.from) {
    if (!language_1.isSupport(options.from)) {
      e = new Error();
      e.language = options.from;
    }
  }
  if (!language_1.isSupport(options.to)) {
    e = new Error();
    e.language = options.to;
  }
  if (e) {
    e.code = 400;
    e.message = 'The language \'' + e.language + '\' is not supported';
    return new Promise(function (_, reject) {
      reject(e);
    });
  }

  var tld = options.tld || 'com';
  return translateToken
    .get(data.join(''), {
      tld: tld,
      proxy: options.proxy || false,
    })
    .then(function (res) {
      const text = util_1.arrayStringify(data);
      const url = `/translate_a/single`;
      var query = {
        client: options.client || 'gtx',
        sl: options.from,
        tl: options.to,
        hl: options.to,
        dt: 't',
        ie: 'UTF-8',
        oe: 'UTF-8',
        otf: 1,
        ssel: 0,
        tsel: 0,
        kc: 7,
        [res.name]: res.value,
        q: text
      };

      var headers = {
        "content-type": "application/json",
        "Accept": "application/json, text/plain, */*",
        'X-Requested-With': 'XMLHttpRequest'
      };

      var extra = {
        method: 'post',
        headers,
        baseURL: 'https://translate.google.' + tld,
        url,
        params: query,
        proxy: options.proxy || false
      };

      return axios(extra).then(function (response) {
        const res = util_1.parseMultiple(response.data[0]);
        return Promise.resolve(res);
      }).catch(function (error) {
        return Promise.reject(error);
      });
    })
}

module.exports.default = translate;
