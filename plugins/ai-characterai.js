const N = F
;(function (A, i) {
  const e = F,
    G = A()
  while (!![]) {
    try {
      const k =
        (-parseInt(e(0x90)) / 0x1) * (-parseInt(e(0x8a)) / 0x2) +
        (-parseInt(e(0x99)) / 0x3) * (parseInt(e(0x9c)) / 0x4) +
        (-parseInt(e(0x86)) / 0x5) * (-parseInt(e(0x92)) / 0x6) +
        (-parseInt(e(0x88)) / 0x7) * (-parseInt(e(0x8c)) / 0x8) +
        -parseInt(e(0x87)) / 0x9 +
        parseInt(e(0x8b)) / 0xa +
        -parseInt(e(0x9a)) / 0xb
      if (k === i) break
      else G['push'](G['shift']())
    } catch (r) {
      G['push'](G['shift']())
    }
  }
})(T, 0x1c5ed)
import C from 'node-fetch'
import x from 'fs'
function T() {
  const E = [
    'startsWith',
    'parse',
    '196130JGUbrV',
    '970740XdBpbi',
    '47957Ikhfdd',
    'slice',
    '814vYiRtG',
    '2248900hpUdXs',
    '8yEkVwE',
    'sendPresenceUpdate',
    'cai_nicknames.json',
    'composing',
    '179HtGgWq',
    'chat',
    '12VIwrlq',
    'includes',
    'reply',
    '&message=',
    'text',
    'error',
    'readFileSync',
    '3YXaXlX',
    '682bamEwp',
    'join',
    '635676nlqhTd',
    'Error\x20sending\x20request:',
  ]
  T = function () {
    return E
  }
  return T()
}
let nicknameCharIdDict = {}
const storageFilePath = N(0x8e)
function F(A, i) {
  const G = T()
  return (
    (F = function (k, r) {
      k = k - 0x85
      let M = G[k]
      return M
    }),
    F(A, i)
  )
}
if (x['existsSync'](storageFilePath))
  try {
    const fileData = x[N(0x98)](storageFilePath, 'utf-8')
    nicknameCharIdDict = JSON[N(0x85)](fileData)
  } catch (q) {
    console['error']('Error\x20loading\x20JSON\x20file:', q)
  }
const nicknames = Object['keys'](nicknameCharIdDict)
export async function before(A, { conn: i, isOwner: G, isAdmin: k, isROwner: r }) {
  const f = N
  if (A[f(0x96)] && A[f(0x96)][f(0x9e)]('.')) {
    const M = A[f(0x96)]['split']('\x20'),
      Q = M[0x0][f(0x89)](0x1)
    if (nicknames[f(0x93)](Q)) {
      i[f(0x8d)](f(0x8f), A[f(0x91)])
      const d = nicknameCharIdDict[Q],
        u = M[f(0x89)](0x1)[f(0x9b)]('\x20')
      try {
        const V = await C(
            'https://animecafe-characterai-indratensei.cloud.okteto.net/cai?char=' +
              d +
              f(0x95) +
              encodeURIComponent(u)
          ),
          L = await V['json'](),
          U = L['text']
        A[f(0x94)](U)
      } catch (H) {
        console[f(0x97)](f(0x9d), H)
      }
    }
  }
}
