const _0x17c9ba = _0x5be8
;(function (_0x4fe383, _0x4c5611) {
  const _0x2a391b = _0x5be8,
    _0x416ecb = _0x4fe383()
  while (!![]) {
    try {
      const _0x2bad52 =
        -parseInt(_0x2a391b(0x130)) / 0x1 +
        parseInt(_0x2a391b(0x127)) / 0x2 +
        parseInt(_0x2a391b(0x13a)) / 0x3 +
        -parseInt(_0x2a391b(0x151)) / 0x4 +
        (-parseInt(_0x2a391b(0x14a)) / 0x5) * (parseInt(_0x2a391b(0x148)) / 0x6) +
        -parseInt(_0x2a391b(0x153)) / 0x7 +
        parseInt(_0x2a391b(0x13e)) / 0x8
      if (_0x2bad52 === _0x4c5611) break
      else _0x416ecb['push'](_0x416ecb['shift']())
    } catch (_0x215faf) {
      _0x416ecb['push'](_0x416ecb['shift']())
    }
  }
})(_0x567c, 0x80bd9)
import _0x27d1c3 from 'form-data'
import _0x49e333 from 'jimp'
async function processing(_0x32082e, _0x511952) {
  return new Promise((_0x39cf21, _0x47ecc8) => {
    const _0x3a8c30 = _0x5be8
    let _0x345014 = [_0x3a8c30(0x131), 'recolor', 'dehaze']
    _0x511952 = _0x345014[_0x3a8c30(0x154)](_0x511952) ? _0x511952 : _0x345014[0x0]
    let _0x59d08d,
      _0x4ba4d6 = new _0x27d1c3(),
      _0x22eb48 = _0x3a8c30(0x141) + _0x3a8c30(0x135) + _0x3a8c30(0x158) + _0x511952
    _0x4ba4d6[_0x3a8c30(0x132)]('model_version', 0x1, {
      'Content-Transfer-Encoding': _0x3a8c30(0x12b),
      contentType: 'multipart/form-data;\x20charset=utf-8',
    }),
      _0x4ba4d6[_0x3a8c30(0x132)](_0x3a8c30(0x14b), Buffer[_0x3a8c30(0x124)](_0x32082e), {
        filename: 'enhance_image_body.jpg',
        contentType: _0x3a8c30(0x12c),
      }),
      _0x4ba4d6[_0x3a8c30(0x150)](
        {
          url: _0x22eb48,
          host: _0x3a8c30(0x14c),
          path: '/' + _0x511952,
          protocol: _0x3a8c30(0x159),
          headers: {
            'User-Agent': _0x3a8c30(0x143),
            Connection: _0x3a8c30(0x134),
            'Accept-Encoding': _0x3a8c30(0x14f),
          },
        },
        function (_0x2632f2, _0xf0ef98) {
          const _0x4f6c5e = _0x3a8c30
          if (_0x2632f2) _0x47ecc8()
          let _0x381efd = []
          _0xf0ef98['on']('data', function (_0x591a60) {
            const _0x70c73f = _0x5be8
            _0x381efd[_0x70c73f(0x126)](_0x591a60)
          })['on'](_0x4f6c5e(0x13d), () => {
            const _0x4b8570 = _0x4f6c5e
            _0x39cf21(Buffer[_0x4b8570(0x144)](_0x381efd))
          }),
            _0xf0ef98['on'](_0x4f6c5e(0x13b), _0x2a4896 => {
              _0x47ecc8()
            })
        }
      )
  })
}
function _0x567c() {
  const _0x49f3e2 = [
    '45773hDfFtn',
    'includes',
    'colorizer',
    'download',
    'unblur',
    '.vyro.ai/',
    'https:',
    '\x20is\x20not\x20supported',
    'reply',
    'from',
    'It\x27s\x20done,\x20bro\x20>//<',
    'push',
    '1919068UfcFLK',
    'enhancer',
    'chat',
    'help',
    'binary',
    'image/jpeg',
    'command',
    'test',
    'Processing,\x20sis...',
    '449551ZqhHwE',
    'enhance',
    'append',
    'sendFile',
    'Keep-Alive',
    'inferenceengine',
    'quoted',
    'colorize',
    'Where\x27s\x20the\x20photo,?',
    'sender',
    '101940EIuXUR',
    'error',
    'Mime\x20',
    'end',
    '13191632VPVXkg',
    'tags',
    'Processing,\x20image...',
    'https://',
    'premium',
    'okhttp/4.9.3',
    'concat',
    'mimetype',
    'recolor',
    'dehaze',
    '266946AzWvvr',
    'hdr',
    '100ubbwBm',
    'image',
    'inferenceengine.vyro.ai',
    'Where\x27s\x20the\x20photo,\x20sis?',
    'msg',
    'gzip',
    'submit',
    '3076948wBmnCL',
    'There\x27s\x20an\x20ongoing\x20process.\x20Please\x20wait\x20until\x20it\x20finishes\x20>//<',
  ]
  _0x567c = function () {
    return _0x49f3e2
  }
  return _0x567c()
}
let handler = async (_0x4a87d3, { conn: _0x292817, usedPrefix: _0x112249, command: _0x4291f5 }) => {
  const _0x53c1c3 = _0x5be8
  switch (_0x4291f5) {
    case _0x53c1c3(0x128):
    case _0x53c1c3(0x157):
    case 'enhance':
      {
        _0x292817[_0x53c1c3(0x128)] = _0x292817[_0x53c1c3(0x128)] ? _0x292817['enhancer'] : {}
        if (_0x4a87d3[_0x53c1c3(0x139)] in _0x292817[_0x53c1c3(0x128)])
          throw 'There\x27s\x20an\x20ongoing\x20process.\x20Please\x20wait\x20until\x20it\x20finishes\x20>//<'
        let _0x2262f4 = _0x4a87d3['quoted'] ? _0x4a87d3[_0x53c1c3(0x136)] : _0x4a87d3,
          _0xc3c698 = (_0x2262f4[_0x53c1c3(0x14e)] || _0x2262f4)[_0x53c1c3(0x145)] || ''
        if (!_0xc3c698) throw _0x53c1c3(0x14d)
        if (!/image\/(jpe?g|png)/[_0x53c1c3(0x12e)](_0xc3c698)) throw _0xc3c698 + _0x53c1c3(0x122)
        else _0x292817[_0x53c1c3(0x128)][_0x4a87d3['sender']] = !![]
        _0x4a87d3[_0x53c1c3(0x123)](_0x53c1c3(0x12f))
        let _0x29bb6b = await _0x2262f4[_0x53c1c3(0x156)](),
          _0x39033c
        try {
          const _0x2017d4 = await processing(_0x29bb6b, _0x53c1c3(0x131))
          _0x292817[_0x53c1c3(0x133)](
            _0x4a87d3[_0x53c1c3(0x129)],
            _0x2017d4,
            '',
            _0x53c1c3(0x125),
            _0x4a87d3
          )
        } catch (_0x4d1cdd) {
          _0x39033c = !![]
        } finally {
          _0x39033c && _0x4a87d3[_0x53c1c3(0x123)]('Process\x20failed\x20:('),
            delete _0x292817['enhancer'][_0x4a87d3['sender']]
        }
      }
      break
    case _0x53c1c3(0x137):
    case 'colorizer':
      {
        _0x292817[_0x53c1c3(0x146)] = _0x292817[_0x53c1c3(0x146)] ? _0x292817[_0x53c1c3(0x146)] : {}
        if (_0x4a87d3['sender'] in _0x292817[_0x53c1c3(0x146)]) throw _0x53c1c3(0x152)
        let _0x4ca928 = _0x4a87d3[_0x53c1c3(0x136)] ? _0x4a87d3[_0x53c1c3(0x136)] : _0x4a87d3,
          _0xa6aa98 = (_0x4ca928['msg'] || _0x4ca928)['mimetype'] || ''
        if (!_0xa6aa98) throw _0x53c1c3(0x14d)
        if (!/image\/(jpe?g|png)/[_0x53c1c3(0x12e)](_0xa6aa98))
          throw _0x53c1c3(0x13c) + _0xa6aa98 + _0x53c1c3(0x122)
        else _0x292817[_0x53c1c3(0x146)][_0x4a87d3[_0x53c1c3(0x139)]] = !![]
        _0x4a87d3['reply'](_0x53c1c3(0x12f))
        let _0x4a8555 = await _0x4ca928['download'](),
          _0x5bec7d
        try {
          const _0x583aa7 = await processing(_0x4a8555, _0x53c1c3(0x146))
          _0x292817[_0x53c1c3(0x133)](_0x4a87d3['chat'], _0x583aa7, '', _0x53c1c3(0x125), _0x4a87d3)
        } catch (_0x4ab18e) {
          _0x5bec7d = !![]
        } finally {
          _0x5bec7d && _0x4a87d3[_0x53c1c3(0x123)]('Process\x20failed\x20:('),
            delete _0x292817['recolor'][_0x4a87d3[_0x53c1c3(0x139)]]
        }
      }
      break
    case 'hd':
    case _0x53c1c3(0x149):
      {
        _0x292817[_0x53c1c3(0x149)] = _0x292817[_0x53c1c3(0x149)] ? _0x292817['hdr'] : {}
        if (_0x4a87d3[_0x53c1c3(0x139)] in _0x292817['hdr']) throw _0x53c1c3(0x152)
        let _0x4ab7af = _0x4a87d3[_0x53c1c3(0x136)] ? _0x4a87d3[_0x53c1c3(0x136)] : _0x4a87d3,
          _0x44e352 = (_0x4ab7af['msg'] || _0x4ab7af)[_0x53c1c3(0x145)] || ''
        if (!_0x44e352) throw _0x53c1c3(0x138)
        if (!/image\/(jpe?g|png)/[_0x53c1c3(0x12e)](_0x44e352))
          throw _0x53c1c3(0x13c) + _0x44e352 + _0x53c1c3(0x122)
        else _0x292817['hdr'][_0x4a87d3[_0x53c1c3(0x139)]] = !![]
        _0x4a87d3['reply'](_0x53c1c3(0x140))
        let _0x219970 = await _0x4ab7af[_0x53c1c3(0x156)](),
          _0x44eecd
        try {
          const _0x550f70 = await processing(_0x219970, _0x53c1c3(0x147))
          _0x292817[_0x53c1c3(0x133)](
            _0x4a87d3[_0x53c1c3(0x129)],
            _0x550f70,
            '',
            _0x53c1c3(0x125),
            _0x4a87d3
          )
        } catch (_0x5b17f9) {
          _0x44eecd = !![]
        } finally {
          _0x44eecd && _0x4a87d3[_0x53c1c3(0x123)]('Process\x20failed\x20:('),
            delete _0x292817[_0x53c1c3(0x149)][_0x4a87d3[_0x53c1c3(0x139)]]
        }
      }
      break
  }
}
function _0x5be8(_0x44d910, _0x33f6d3) {
  const _0x567ca3 = _0x567c()
  return (
    (_0x5be8 = function (_0x5be84a, _0x2e0d42) {
      _0x5be84a = _0x5be84a - 0x122
      let _0x219928 = _0x567ca3[_0x5be84a]
      return _0x219928
    }),
    _0x5be8(_0x44d910, _0x33f6d3)
  )
}
;(handler[_0x17c9ba(0x12a)] = [
  'hd',
  'hdr',
  'unblur',
  'colorize',
  _0x17c9ba(0x155),
  _0x17c9ba(0x131),
  'enhancer',
  _0x17c9ba(0x147),
  _0x17c9ba(0x146),
  _0x17c9ba(0x131),
]),
  (handler[_0x17c9ba(0x13f)] = ['ai']),
  (handler[_0x17c9ba(0x142)] = !![]),
  (handler[_0x17c9ba(0x12d)] = ['hd'])
export default handler
