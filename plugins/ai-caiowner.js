const p = F
;(function (A, i) {
  const Y = F,
    G = A()
  while (!![]) {
    try {
      const k =
        (parseInt(Y(0xf8)) / 0x1) * (-parseInt(Y(0xe3)) / 0x2) +
        (parseInt(Y(0x113)) / 0x3) * (parseInt(Y(0xda)) / 0x4) +
        parseInt(Y(0xe4)) / 0x5 +
        (parseInt(Y(0xde)) / 0x6) * (-parseInt(Y(0x102)) / 0x7) +
        (parseInt(Y(0xe9)) / 0x8) * (-parseInt(Y(0x104)) / 0x9) +
        (-parseInt(Y(0x10e)) / 0xa) * (parseInt(Y(0xe5)) / 0xb) +
        parseInt(Y(0xee)) / 0xc
      if (k === i) break
      else G['push'](G['shift']())
    } catch (r) {
      G['push'](G['shift']())
    }
  }
})(T, 0x2151e)
const _0x4fa899 = _0x44a6
function F(A, i) {
  const G = T()
  return (
    (F = function (k, r) {
      k = k - 0xd5
      let M = G[k]
      return M
    }),
    F(A, i)
  )
}
;(function (A, i) {
  const W = F,
    G = _0x44a6,
    k = A()
  while (!![]) {
    try {
      const r =
        -parseInt(G(0x7d)) / 0x1 +
        parseInt(G(0x9e)) / 0x2 +
        -parseInt(G(0x8f)) / 0x3 +
        (parseInt(G(0x8a)) / 0x4) * (parseInt(G(0x8e)) / 0x5) +
        -parseInt(G(0x91)) / 0x6 +
        parseInt(G(0x85)) / 0x7 +
        parseInt(G(0x94)) / 0x8
      if (r === i) break
      else k['push'](k[W(0x10c)]())
    } catch (M) {
      k[W(0xfb)](k['shift']())
    }
  }
})(_0x58ac, 0x9a2cf)
import X from 'node-fetch'
import b from 'fs'
function _0x58ac() {
  const a = F,
    A = [
      a(0x107),
      a(0xe1),
      a(0xe2),
      a(0xff),
      a(0xf0),
      a(0xf5),
      a(0x10b),
      a(0xd7),
      'Invalid\x20\x27.cai\x27\x20command.\x0a*Usage*:\x0a.cai\x20search\x20```<query>```,\x0a.cai\x20new\x20```<charnickname>```,\x0a.cai\x20trending,\x0a.cai\x20add\x20```<nickname>:<charid>```.',
      a(0xe0),
      a(0xfa),
      a(0xf7),
      a(0xe7),
      a(0x101),
      a(0xf6),
      a(0xea),
      'command',
      a(0x111),
      'keys',
      a(0xef),
      'cai',
      'split',
      '693817RzAHtP',
      a(0xd6),
      a(0xd8),
      a(0x10d),
      a(0x10a),
      a(0x108),
      a(0xf2),
      a(0xec),
      a(0x100),
      a(0x103),
      a(0xdc),
      a(0xfe),
      a(0xf9),
      '4wjYCzF',
      a(0xdb),
      a(0x112),
      'Added\x20nickname\x20\x22',
      a(0xd5),
      '682539xdowER',
      'startsWith',
      a(0x109),
      'Error\x20fetching\x20trending\x20data\x20from\x20the\x20API.',
      a(0xed),
      '5020944yxPlCm',
    ]
  return (
    (_0x58ac = function () {
      const n = a
      if (n(0xe8) !== 'DppZN') {
        if (v === g(0x99) || y === n(0x10d)) {
          const G = o[z(0xa7)](m)
          G[n(0x105)] === 0x0
            ? O[n(0xe2)](n(0xfc))
            : S[J(0x97)](R(0x8b) + G[t(0xa2)](D(0xa1)) + n(0xd9))
        } else throw c(0x9d)
      } else return A
    }),
    _0x58ac()
  )
}
let nicknameCharIdDict = {}
const storageFilePath = _0x4fa899(0x89)
if (b[_0x4fa899(0x9b)](storageFilePath))
  try {
    const fileData = b[_0x4fa899(0x95)](storageFilePath, _0x4fa899(0xa3))
    nicknameCharIdDict = JSON[_0x4fa899(0x82)](fileData)
  } catch (w) {
    console[_0x4fa899(0x86)]('Error\x20loading\x20JSON\x20file:', w)
  }
let handler = async (A, { text: i, usedPrefix: G, command: k }) => {
  const B = F,
    r = _0x4fa899
  if (typeof i !== B(0x10f)) throw r(0x8c)
  if (i[B(0xf1)](r(0xa6))) {
    const M = i[r(0x7e)](0x7),
      Q = B(0xe6) + encodeURIComponent(M)
    try {
      const d = await X(Q),
        u = await d[r(0xa8)](),
        V = u[r(0x84)][r(0x80)][r(0x7e)](0x0, 0x5),
        L = V[B(0x106)](U => ({
          external_id: U[r(0x88)],
          participant_name: U[r(0x9f)],
          title: U[r(0x83)],
        }))
      A[r(0x97)](JSON[B(0xe1)](L, null, 0x2))
    } catch (U) {
      console[r(0x86)](r(0x98), U)
      throw B(0xf4)
    }
  } else {
    if (i[r(0x90)](r(0x93))) {
      const H = i[r(0x7e)](0x4),
        v = nicknameCharIdDict[H]
      if (v) {
        const g = B(0xf3) + v
        try {
          const y = await X(g),
            I = await y[r(0xa8)]()
          A[r(0x97)](r(0x7f)), A[r(0x97)](I)
        } catch (j) {
          if (B(0xfd) !== 'qmqEr') {
            console[r(0x86)]('Error:', j)
            throw B(0xf4)
          } else {
            r = M - 0x7b
            let x = Q[d]
            return x
          }
        }
      } else A[r(0x97)](B(0x110) + H + '\x22')
    } else {
      if (i['startsWith'](r(0x9a))) {
        if ('WZkwN' === 'SQfsA') {
          M[Q(0x86)](d(0x98), u)
          throw V(0x92)
        } else {
          const q = i[r(0x7e)](0x4),
            [e, N] = q[r(0x7c)](':')
          ;(nicknameCharIdDict[e] = N),
            b[B(0xdf)](storageFilePath, JSON[B(0xe1)](nicknameCharIdDict, null, 0x2)),
            A[r(0x97)](r(0x8d) + e + r(0x9c) + N + '\x22')
        }
      } else {
        if (i === r(0xa4)) {
          if (B(0xeb) !== B(0x114)) {
            const f = r(0x87)
            try {
              const E = await X(f),
                c = await E[r(0xa8)](),
                o = c[r(0xa0)][B(0xf7)][B(0xd6)](0x0, 0x5),
                z = o[B(0x106)](m => ({
                  external_id: m[r(0x88)],
                  participant_name: m[r(0x9f)],
                  title: m[r(0x83)],
                }))
              A[r(0x97)](JSON[r(0x96)](z, null, 0x2))
            } catch (m) {
              console[r(0x86)](r(0x98), m)
              throw r(0x92)
            }
          } else {
            const S = M()
            return (
              (Q = function (J, R) {
                J = J - 0x7b
                let t = S[J]
                return t
              }),
              d(u, V)
            )
          }
        } else {
          if (i === r(0x99) || i === B(0x10d)) {
            const S = Object[r(0xa7)](nicknameCharIdDict)
            S[B(0x105)] === 0x0
              ? A['reply'](B(0xfc))
              : A[r(0x97)](r(0x8b) + S[r(0xa2)](r(0xa1)) + '```')
          } else throw r(0x9d)
        }
      }
    }
  }
}
;(handler[_0x4fa899(0xa5)] = [_0x4fa899(0x7b)]),
  (handler[p(0xdd)] = ![]),
  (handler['tags'] = ['AI']),
  (handler[_0x4fa899(0x81)] = !![])
function T() {
  const Z = [
    '8LWjwwv',
    'trending',
    'uGlFC',
    'search_results',
    'new\x20',
    '251532kKEnwf',
    'json',
    'chars',
    'startsWith',
    'title',
    'https://animecafe-characterai-indratensei.cloud.okteto.net/cai-newchat?char=',
    'Error\x20fetching\x20data\x20from\x20the\x20API.',
    'add\x20',
    'utf-8',
    'trending_characters',
    '72099gGsqdl',
    'cai_nicknames.json',
    'participant__name',
    'push',
    'No\x20character\x20nicknames\x20are\x20available.',
    'EphcW',
    'external_id',
    'Error:',
    '1962520pdZNjm',
    'join',
    '7JJSdAz',
    'error',
    '598887NChrqB',
    'length',
    'map',
    'readFileSync',
    'parse',
    '2499822wDYlbq',
    'owner',
    'existsSync',
    'shift',
    'characters',
    '22250lkyuts',
    'string',
    'No\x20character\x20found\x20with\x20the\x20nickname\x20\x22',
    'search\x20',
    'Invalid\x20input.\x20Expected\x20a\x20string.',
    '6cfzsRf',
    'ipiAs',
    '2489345QnUToG',
    'slice',
    '\x22\x20for\x20charid\x20\x22',
    'Done\x20bhosadike',
    '```',
    '447448ApQDXG',
    'Characters\x20Available:\x0a```➤\x20',
    'https://animecafe-characterai-indratensei.cloud.okteto.net/trending',
    'diamond',
    '47820bINHpu',
    'writeFileSync',
    '1127246PmeYMi',
    'stringify',
    'reply',
    '4NKaGHm',
    '841770geUlNt',
    '286YmpKuF',
    'https://animecafe-characterai-indratensei.cloud.okteto.net/search?query=',
    '```\x0a➤\x20\x20```',
    'DppZN',
  ]
  T = function () {
    return Z
  }
  return T()
}
function _0x44a6(A, i) {
  const G = _0x58ac()
  return (
    (_0x44a6 = function (k, r) {
      k = k - 0x7b
      let M = G[k]
      return M
    }),
    _0x44a6(A, i)
  )
}
export default handler
