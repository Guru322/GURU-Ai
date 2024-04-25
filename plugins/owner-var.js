const _0x2b79ae = _0x719c
function _0x36fc() {
  const _0x4a89ad = [
    '8006705oRlqlw',
    'config',
    'command',
    'owner',
    'get',
    '25030envDwN',
    'length',
    'You\x20are\x20not\x20the\x20owner',
    'rowner',
    'split',
    '309zkYgXY',
    'Failed\x20to\x20modify\x20config\x20var',
    'tags',
    '116TDAdlW',
    'var',
    '8omEzTg',
    'env',
    '281966TbwFXo',
    '4515576zLrzgn',
    'trim',
    'help',
    'patch',
    '14033140BaXFXU',
    '2626kAKsBt',
    '11092221kYItjr',
    'message',
    'Usage:\x20!var\x20Name:Value',
    '/apps/',
    'Error\x20modifying\x20config\x20var:',
    '\x0aWait\x20a\x20moment',
  ]
  _0x36fc = function () {
    return _0x4a89ad
  }
  return _0x36fc()
}
;(function (_0x2404c6, _0x211d45) {
  const _0x57e006 = _0x719c,
    _0x1a0540 = _0x2404c6()
  while (!![]) {
    try {
      const _0x2670ac =
        parseInt(_0x57e006(0x148)) / 0x1 +
        (-parseInt(_0x57e006(0x14e)) / 0x2) * (parseInt(_0x57e006(0x141)) / 0x3) +
        (parseInt(_0x57e006(0x144)) / 0x4) * (-parseInt(_0x57e006(0x13c)) / 0x5) +
        -parseInt(_0x57e006(0x149)) / 0x6 +
        -parseInt(_0x57e006(0x155)) / 0x7 +
        (-parseInt(_0x57e006(0x146)) / 0x8) * (-parseInt(_0x57e006(0x14f)) / 0x9) +
        parseInt(_0x57e006(0x14d)) / 0xa
      if (_0x2670ac === _0x211d45) break
      else _0x1a0540['push'](_0x1a0540['shift']())
    } catch (_0x2ad54d) {
      _0x1a0540['push'](_0x1a0540['shift']())
    }
  }
})(_0x36fc, 0xb4e3d)
import { spawn } from 'child_process'
import _0x95ff65 from 'heroku-client'
function _0x719c(_0x43e397, _0x4de176) {
  const _0x36fc40 = _0x36fc()
  return (
    (_0x719c = function (_0x719cd6, _0xa5c8ee) {
      _0x719cd6 = _0x719cd6 - 0x13a
      let _0x323651 = _0x36fc40[_0x719cd6]
      return _0x323651
    }),
    _0x719c(_0x43e397, _0x4de176)
  )
}
let handler = async (_0x10f59d, { isROwner: _0x1e39bb, text: _0x1c1884 }) => {
  const _0x248f44 = _0x719c
  if (_0x1e39bb) {
    const _0x45ea1c = _0x1c1884[_0x248f44(0x14a)]()[_0x248f44(0x140)]('\x20')
    if (_0x45ea1c[_0x248f44(0x13d)] !== 0x1 || !_0x45ea1c[0x0]['includes'](':'))
      throw _0x248f44(0x151)
    const [_0x434c1e, _0x45126b] = _0x45ea1c[0x0]['split'](':')
    await _0x10f59d['reply'](
      '⚙️\x20Modifying\x20Config\x20Var...\x0aAdding/Modifying\x20' +
        _0x434c1e +
        '\x20with\x20value\x20' +
        _0x45126b +
        _0x248f44(0x154)
    )
    const _0x20a4ee = new _0x95ff65({ token: process['env']['HKEY'] }),
      _0x36522b = process[_0x248f44(0x147)]['HAPP']
    try {
      const _0x4e2f26 = await _0x20a4ee[_0x248f44(0x13b)](
        _0x248f44(0x152) + _0x36522b + '/config-vars'
      )
      ;(_0x4e2f26[_0x434c1e] = _0x45126b),
        await _0x20a4ee[_0x248f44(0x14c)](_0x248f44(0x152) + _0x36522b + '/config-vars', {
          body: _0x4e2f26,
        })
    } catch (_0x4bf183) {
      console['error'](_0x248f44(0x153), _0x4bf183[_0x248f44(0x150)])
      throw _0x248f44(0x142)
    }
  } else throw _0x248f44(0x13e)
}
;(handler[_0x2b79ae(0x14b)] = [_0x2b79ae(0x156)]),
  (handler[_0x2b79ae(0x143)] = [_0x2b79ae(0x13a)]),
  (handler[_0x2b79ae(0x157)] = [_0x2b79ae(0x145)]),
  (handler[_0x2b79ae(0x13f)] = !![])
export default handler
