import syntaxerror from 'syntax-error'
import { format } from 'util'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { createRequire } from 'module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname)
const baileys = require('baileys-pro')

let handler = async (m, _2) => {
  let { conn, usedPrefix, noPrefix, args, groupMetadata } = _2
  let _return
  let _syntax = ''
  let _text = (/^=/.test(usedPrefix) ? 'return ' : '') + noPrefix
  let old = m.exp * 1
  try {
    let i = 50 
    let printBuffer = []
    let f = {
      exports: {},
    }
    
    const print = (...args) => {
      if (--i < 1) {
        printBuffer.push('... (output truncated, too many lines)')
        return
      }
      const formatted = format(...args)
      printBuffer.push(formatted)
      console.log(...args)
    }
    
    let exec = new (async () => {}).constructor(
      'print',
      'm',
      'handler',
      'require',
      'conn',
      'Array',
      'process',
      'args',
      'groupMetadata',
      'baileys',
      'module',
      'exports',
      'argument',
      _text
    )
    
    _return = await exec.call(
      conn,
      print,
      m,
      handler,
      require,
      conn,
      CustomArray,
      process,
      args,
      groupMetadata,
      baileys,
      f,
      f.exports,
      [conn, _2]
    )
    
    if (_return === undefined) {
      try {
        _return = eval(noPrefix)
      } catch (evalError) {
        console.log('Direct evaluation failed:', evalError)
        _return = 'Error: ' + evalError.message
      }
    }
    
    if (printBuffer.length > 0) {
      await conn.reply(m.chat, printBuffer.join('\n'), m)
    }
  } catch (e) {
    let err = syntaxerror(_text, 'Execution Function', {
      allowReturnOutsideFunction: true,
      allowAwaitOutsideFunction: true,
      sourceType: 'module',
    })
    if (err) _syntax = '```' + err + '```\n\n'
    _return = e
  } finally {
    conn.reply(
      m.chat, 
      _syntax + (_return === undefined ? 'No output or undefined result' : format(_return)), 
      m
    )
    m.exp = old
  }
}
handler.customPrefix = /^=?> /
handler.command = new RegExp()
handler.rowner = true

export default handler

class CustomArray extends Array {
  constructor(...args) {
    if (typeof args[0] == 'number') return super(Math.min(args[0], 10000))
    else return super(...args)
  }
}
